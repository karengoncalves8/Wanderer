import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Destino } from '@/interfaces/Destino';
import { Ionicons } from '@expo/vector-icons';
import { destinoService } from '@/services/destinoSevice';
import { ApiException } from '@/config/apiException';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

export default function DestinationDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session } = useSession();   
    const router = useRouter();
    const { t } = useTranslation();

    const [destinationData, setDestinationData] = useState<Destino | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (!id) {
        return (
            <View style={styles.container}>
                <Text>{t('destinationDetails.noDestinationFound')}</Text>
            </View>
        );
    }

    useEffect(() => {
        const fetchDestination = async () => {
            const response = await destinoService.getDestinationDetails(id, session?.user.pais || 'br');
            if (response instanceof ApiException) {
                Toast.show({
                    type: 'error',
                    text1: t('common.error'),
                    text2: response.message || t('destinationDetails.fetchError')
                });
                return;
            }
            setDestinationData(response);
            setIsLoading(false);
        };
        fetchDestination();
    }, [id]);

    const renderImageItem = ({ item }: { item: string }) => (
        <View style={styles.slide}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
        </View>
    );

    const renderSection = (title: string, content: any) => {
        if (!content || (Array.isArray(content) && content.length === 0)) return null;

        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {Array.isArray(content) ? (
                    content.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.title || item.name || item.season}</Text>
                            <Text style={styles.itemText}>
                                {item.description || item.content || item.characteristics}
                            </Text>
                            {item.period && (
                                <Text style={styles.itemPeriod}>{item.period}</Text>
                            )}
                        </View>
                    ))
                ) : typeof content === 'object' ? (
                    Object.entries(content).map(([key, value]) => (
                        <View key={key} style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>
                                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                            </Text>
                            <Text style={styles.itemText}>{String(value)}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.itemText}>{String(content)}</Text>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && !destinationData ? (
                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={styles.title}>{t('common.loading')}</Text>
                </View>
            ) : (
                <ScrollView>
                    {/* Header with back button */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{destinationData?.name}</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Image Carousel */}
                    <View style={styles.carouselContainer}>
                        <ScrollView 
                            horizontal 
                            pagingEnabled 
                            showsHorizontalScrollIndicator={false}
                            style={styles.imageSlider}
                        >
                            {destinationData?.imgsUrl.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Destination Info */}
                    <View style={styles.content}>
                        <Text style={styles.title}>{destinationData?.name}</Text>
                        <Text style={styles.subtitle}>{destinationData?.results?.short_description}</Text>

                        {destinationData?.results?.location && (
                            <View style={styles.locationContainer}>
                                <Ionicons name="location" size={20} color="#666" />
                                <Text style={styles.locationText}>
                                    {destinationData?.results.location.city}, {destinationData?.results.location.country}
                                </Text>
                            </View>
                        )}

                        {renderSection(t('destinationDetails.landmarks'), destinationData?.results?.landmarks)}
                        {renderSection(t('destinationDetails.averageCost'), destinationData?.results?.average_cost)}
                        {renderSection(t('destinationDetails.generalTips'), destinationData?.results?.general_tips)}
                        {renderSection(t('destinationDetails.safetyInfo'), destinationData?.results?.safety_info)}
                        {renderSection(t('destinationDetails.climate'), destinationData?.results?.climate)}
                        {renderSection(t('destinationDetails.documents'), destinationData?.results?.documents)}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    carouselContainer: {
        height: 250,
        width: '100%',
        marginBottom: 16,
    },
    slide: {
        width: width,
        height: '100%',
    },
    imageSlider: {
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        width: width,
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
        lineHeight: 22,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    locationText: {
        marginLeft: 8,
        color: '#666',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
    },
    itemContainer: {
        marginBottom: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#2c3e50',
    },
    itemText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    itemPeriod: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        marginTop: 4,
    },
});