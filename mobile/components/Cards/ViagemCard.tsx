import { Viagem } from "@/interfaces/Viagem";
import { colors } from "@/styles/globalStyles";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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

    return (
        <View style={[styles.card, style]}>
             <Image
        source={{ uri: 'https://forbes.com.br/wp-content/uploads/2024/03/Life_tendencias-de-viagem-2024.jpg' }}
        style={styles.image}
      />
            <View>
                <Text style={[styles.viagemName]}>{viagem.nome}</Text>
                <Text style={[styles.viagemDate]}>{viagem.dataIda.toLocaleDateString()} - {viagem.dataVolta.toLocaleDateString()}</Text>
                <Text style={[styles.viagemDate]}>{viagem.duracao} dias</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#2D8CFF" />

        </View>
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
