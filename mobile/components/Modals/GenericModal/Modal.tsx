// components/ui/AppModal.tsx
import React, { useEffect, useRef } from "react";
import {
    Animated,
    BackHandler,
    Easing,
    Modal,
    Pressable,
    Text,
    View
} from "react-native";

import MaIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from "@/styles/globalStyles";
import styles from './styles';

type ModalProps = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  footerButtons?: React.ReactNode;
  dismissOnBackdrop?: boolean; // clicar fora fecha?
};

export default function GenericModal({
  visible,
  title,
  onClose,
  children,
  footerButtons,
  dismissOnBackdrop = true,
}: ModalProps) {
  // animações (fade no backdrop + slide no conteúdo)
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 140, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
        Animated.timing(slide, { toValue: 0, duration: 180, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fade, { toValue: 0, duration: 120, useNativeDriver: true }),
        Animated.timing(slide, { toValue: 20, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  // Android: botão voltar fecha o modal
  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [visible, onClose]);

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
            onClose();
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={styles.modalHeader}> 
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => onClose()}
                    >
                        <MaIcons name="close" size={24} color={colors.gray500} />
                    </Pressable>
                </View>
                {children}
                <View style={styles.footer}>
                    {footerButtons}
                </View>
            </View>
        </View>
    </Modal>
  );
}
