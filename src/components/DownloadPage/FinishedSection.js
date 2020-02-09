import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import style from './style'

//Context
import { DownloadContext } from '../../contexts/DownloadContext'

//Components
import EpisodeItem from '../CastPage/EpisodeItem'

export default FinishedSection = () => {
    const { downloads } = useContext(DownloadContext);
    const finishedDownloads = downloads.filter(({status}) => status === "complete")

    return (
        finishedDownloads.length > 0 ?
            <FlatList
                data={finishedDownloads}
                renderItem={({ item }) => <EpisodeItem fromDownload castId={item.name.split("_")[0]} cover={item.episode.image} episode={{...item.episode}}/>}
                keyExtractor={item => item.episode.id}
                style={{marginTop: 10}}
            />
        :
            <BackgroundWarning margin="30%" label="Nenhum episódio encontrado" icon="mic"/>
    );
}