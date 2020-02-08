import React, { createContext, Component } from 'react';
import { ToastAndroid } from 'react-native'
import RNBackgroundDownloader from 'react-native-background-downloader';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const { ls } = RNFetchBlob.fs;
const { documents } = RNBackgroundDownloader.directories;

export const DownloadContext = createContext();

class DownloadContextProvider extends Component {
    state = {
        downloading: [],
        downloads: [],
        progress: [],
        files: []
    }

    componentDidMount = async () => {
        const files = await ls(`${documents}/media`);

        this.setState({...this.state, files});
        return this.checkExisting();
    }

    checkExisting = async () => {
        let downloading = await RNBackgroundDownloader.checkForExistingDownloads();
        let downloads = await AsyncStorage.getItem("downloads")
    
        for (let task of downloading) {
            task.progress(() => {
                this.updateTask(task);
            }).done(() => {
                this.completeDownload(task.id, "id");
                ToastAndroid.show('Download finalizado', ToastAndroid.SHORT);
            }).error((error) => {
                ToastAndroid.show('Download canceled due to error: ', error, ToastAndroid.SHORT);
            });
        }  

        return this.setState({downloading, downloads: JSON.parse(downloads) || []})
    }

    downloadCast = (timestamp, castId, episode) => {
        let { id, enclosures: [{url}] } = episode;
        let destination = `${RNBackgroundDownloader.directories.documents}/media/${castId}_${timestamp}.mp3`
        
        let task = RNBackgroundDownloader.download({id, url, destination}).begin(() => {
            this.addStoredDownloads(`${castId}_${timestamp}`, episode)

            ToastAndroid.show('Preparando download', ToastAndroid.SHORT);
        }).progress(() => {
            this.updateTask(task);
        }).done(() => {
            this.completeDownload(`${castId}_${timestamp}`, "name")
            ToastAndroid.show('Download finalizado', ToastAndroid.SHORT);
        }).error((error) => {
            ToastAndroid.show('Download canceled due to error: ', error, ToastAndroid.SHORT);
        });
    }

    toggleTaskState = async (task) => {
        const isPaused = task.state === "PAUSED";  
        task[isPaused ? "resume" : "pause"]();
        
        return this.checkExisting().then(() => ToastAndroid.show(`${isPaused ? "Resumindo" : "Pausando"} download`, ToastAndroid.LONG));
    } 

    cancelTask = async (task) => {
        task.stop();

        ToastAndroid.show("Download cancelado", ToastAndroid.LONG);
        return this.setState({...this.state, downloading: await RNBackgroundDownloader.checkForExistingDownloads()})
    }

    updateTask = (task) => {
        const tasksCopy = [...this.state.downloading];
        const taskIndex = tasksCopy.findIndex(t => t.id === task.id); 

        tasksCopy[taskIndex] = task;
        return this.setState({...this.state, downloading: tasksCopy});
    }

    addStoredDownloads = (name, episode) => {
        AsyncStorage.getItem("downloads").then(downloads => {
            let list = JSON.parse(downloads) || []

            list.push({name, episode, status: "downloading"})
            AsyncStorage.setItem("downloads", JSON.stringify(list))
        })
    }

    completeDownload = (name, type) => {
        AsyncStorage.getItem("downloads").then(downloads => {
            let downloadList = JSON.parse(downloads) || [];
            let list = downloadList.map((episode) => {
                if(type === "name"){
                    if(episode.name === name){
                        episode.status = "complete"
                    }
                }else if(type === "id"){
                    if(episode.episode.id === name){
                        episode.status = "complete"
                    }
                }
                return episode;
            });

            AsyncStorage.setItem("downloads", JSON.stringify(list))
        })
    }

    render(){
        return (
            <DownloadContext.Provider value={{...this.state, toggleTaskState: this.toggleTaskState, cancelTask: this.cancelTask, downloadCast: this.downloadCast}}>
                {this.props.children}
            </DownloadContext.Provider>
        )
    }
}

export default DownloadContextProvider;