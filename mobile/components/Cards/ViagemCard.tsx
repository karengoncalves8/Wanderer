import { Viagem } from "@/interfaces/Viagem";
import { googleAPIService } from "@/services/googleAPIService";
import { colors } from "@/styles/globalStyles";
import { setDayOfYear } from "date-fns";
import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatDateStringToStringWithBar } from "@/utils/formatters/formatDateToString";

export type ViagemCardProps = {
    viagem: Viagem;
    style?: ViewStyle;
    onPress?: (viagem: Viagem) => void;
};

export default function ViagemCard({
    viagem,
    style,
    onPress,
}: ViagemCardProps) {
    const [imgUri, setImgUri] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            let defaultImg = "https://forbes.com.br/wp-content/uploads/2024/03/Life_tendencias-de-viagem-2024.jpg"
            // if (viagem.img_url) {
            //     try {
            //         const uri = await googleAPIService.getPlaceImageUri(viagem.img_url);
            //         console.log("uri", uri);
            //         if (typeof uri === 'string') {
            //             setImgUri(uri);
            //         } else {
            //             setImgUri(defaultImg);
            //         }
            //     } catch (error) {
            //         console.error("Erro ao buscar imagem:", error);
            //         setImgUri(defaultImg);
            //     }
            // }
            // else {
            //     setImgUri(defaultImg);
            // }
            setImgUri(defaultImg);
        };
        fetchImage();
    }, [viagem]);    return (
        <TouchableOpacity 
            style={[styles.card, style]} 
            onPress={() => onPress?.(viagem)}
            activeOpacity={0.7}
        >
            {imgUri ? (
                <Image
                source={{ uri: imgUri }}
                style={styles.image}        
                />
            ) : (
                <Text>...</Text>
            )}
             
            <View>
                <Text style={[styles.viagemName]}>{viagem.nome}</Text>
                <Text style={[styles.viagemDate]}>{formatDateStringToStringWithBar(viagem.dataIda)} - {formatDateStringToStringWithBar(viagem.dataVolta)}</Text>
                <Text style={[styles.viagemDate]}>{viagem.duracao} dias</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#2D8CFF" />

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        gap: 10,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginTop: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    viagemName: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        color: colors.gray800,
        fontSize: 18,
    },
    viagemDate:{
        color: colors.gray500,

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
});
