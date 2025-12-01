import { colors } from "@/styles/globalStyles";
import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { useTranslation } from "react-i18next";

interface DestinationCardProps {
  imageURL: string;
  label: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ imageURL, label }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageURL }} style={styles.image} />

      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{t(label)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 300,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badgeContainer: {
    position: "absolute",
    bottom: 15,
    left: 15,
    backgroundColor: colors.lblue500,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DestinationCard;
