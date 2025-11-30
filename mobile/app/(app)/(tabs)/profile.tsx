import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/globalStyles';
import { PrefIdioma, PrefTransporte, PrefAcomodacao, PrefOrcamento } from '@/enums/UsuarioPrefs';
import { useSession } from '@/context/AuthContext';
import { usuarioService } from '@/services/usuarioService';
import Toast from 'react-native-toast-message';
import { ApiException } from '@/config/apiException';
import { Usuario } from '@/interfaces/Usuario';
import { useTranslation } from 'react-i18next';

interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void;
  isExpanded?: boolean;
}

const ExpandableSection = ({ title, icon, children, onPress, isExpanded }: ExpandableSectionProps) => (
  <View style={styles.sectionContainer}>
    <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
      <View style={styles.sectionHeaderContent}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <MaterialIcons 
        name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
        size={24} 
        color={colors.gray400} 
      />
    </TouchableOpacity>
    {isExpanded && (
      <View style={styles.sectionContent}>
        {children}
      </View>
    )}
  </View>
);

interface UserData {
  id?: number;
  name: string;
  email: string;
  language: PrefIdioma;
  preferences: {
    transporte: PrefTransporte;
    acomodacao: PrefAcomodacao;
    orcamento: PrefOrcamento;
  };
}

export default function Profile() {
  const { signOut, session, updateSession } = useSession();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // User data state
  const [userData, setUserData] = useState<UserData>({
    name: session?.user?.nome || '',
    email: session?.user?.email || '',
    language: PrefIdioma.Portugues,
    preferences: {
      transporte: PrefTransporte.Aviao,
      acomodacao: PrefAcomodacao.Hotel,
      orcamento: PrefOrcamento.Medio
    }
  });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Load user data on mount
  useEffect(() => {
    if (session?.user) {
      // Initialize form data with user data
      setFormData(prev => ({
        ...prev,
        name: session.user?.nome || '',
        email: session.user?.email || ''
      }));
      
      // Load user preferences if available
    //   if (session.user.preferences) {
    //     setUserData(prev => ({
    //       ...prev,
    //       preferences: {
    //         transporte: session.user.preferences.transporte || PrefTransporte.Aviao,
    //         acomodacao: session.user.preferences.acomodacao || PrefAcomodacao.Hotel,
    //         orcamento: session.user.preferences.orcamento || PrefOrcamento.Medio
    //       },
    //       language: session.user.preferences.idioma || PrefIdioma.Portugues
    //     }));
    //   }
    }
  }, [session]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSaveProfile = async () => {
    if (!formData.name.trim()) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('profile.nameRequired')
      });
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('validation.passwordMismatch')
      });
      return;
    }

    setIsSaving(true);
    try {
      if (!session?.user?.id) return;
      const userUpdate = {
        usuarioId: session?.user?.id,
        nome: formData.name,
        email: formData.email,
        ...(formData.password && { senha: formData.password })
      };

      const result = await usuarioService.updateUser(userUpdate);
      
      if (result instanceof ApiException) {
        throw new Error(result.message);
      }

      // Update session storage
      updateSession({
        nome: formData.name,
        email: formData.email
      });

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('profile.profileUpdated')
      });

      setExpandedSection(null);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error instanceof Error ? error.message : t('profile.profileUpdateError')
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLanguageSelect = async (language: PrefIdioma) => {
    if (!session?.user?.id) return;

    i18n.changeLanguage(language.toLowerCase());
    
    setIsSaving(true);
    try {
      const result = await usuarioService.updateUserPreferences(session.user.id, {
        idioma: language
      });
      
      if (result instanceof ApiException) {
        throw new Error(result.message);
      }

      // Update session storage
      updateSession({
        preferencias: {
          ...session.user.preferencias,
          idioma: language
        }
      });

      setUserData(prev => ({
        ...prev,
        language
      }));

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('profile.languageUpdated')
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error instanceof Error ? error.message : t('profile.languageUpdateError')
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePreferences = async (updates: Partial<UserData['preferences']>) => {
    if (!session?.user?.id) return;
    
    setIsSaving(true);
    try {
      const result = await usuarioService.updateUserPreferences(session.user.id, updates);
      
      if (result instanceof ApiException) {
        throw new Error(result.message);
      }

      // Update session storage
      updateSession({
        preferencias: {
          ...session.user.preferencias,
          ...updates
        }
      });

      setUserData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          ...updates
        }
      }));

      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('profile.preferencesUpdated')
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: error instanceof Error ? error.message : t('profile.preferencesUpdateError')
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.sky500} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account-circle" size={80} color={colors.sky500} />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>

        <View style={styles.content}>
          <ExpandableSection
            title={t('profile.editProfile')}
            icon={<MaterialIcons name="person-outline" size={24} color={colors.sky500} />}
            isExpanded={expandedSection === 'profile'}
            onPress={() => toggleSection('profile')}
          >
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('profile.name')}</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder={t('profile.name')}
                editable={!isSaving}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('profile.email')}</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder={t('profile.email')}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isSaving}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('profile.newPassword')}</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="••••••••"
                secureTextEntry
                editable={!isSaving}
              />
            </View>
            {formData.password ? (
              <View style={styles.formGroup}>
                <Text style={styles.label}>{t('profile.confirmPassword')}</Text>
                <TextInput
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  placeholder="••••••••"
                  secureTextEntry
                  editable={!isSaving}
                />
              </View>
            ) : null}
            <TouchableOpacity 
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
              onPress={handleSaveProfile}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>{t('profile.saveChanges')}</Text>
              )}
            </TouchableOpacity>
          </ExpandableSection>

          <ExpandableSection
            title={t('profile.language')}
            icon={<MaterialIcons name="language" size={24} color={colors.sky500} />}
            isExpanded={expandedSection === 'language'}
            onPress={() => toggleSection('language')}
          >
            <TouchableOpacity 
              style={styles.languageOption} 
              onPress={() => handleLanguageSelect(PrefIdioma.Portugues)}
              disabled={isSaving}
            >
              <Text style={styles.languageText}>Português</Text>
              {userData.language === PrefIdioma.Portugues && (
                <MaterialIcons name="check" size={24} color={colors.sky500} />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.languageOption} 
              onPress={() => handleLanguageSelect(PrefIdioma.Ingles)}
              disabled={isSaving}
            >
              <Text style={styles.languageText}>English</Text>
              {userData.language === PrefIdioma.Ingles && (
                <MaterialIcons name="check" size={24} color={colors.sky500} />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.languageOption} 
              onPress={() => handleLanguageSelect(PrefIdioma.Espanhol)}
              disabled={isSaving}
            >
              <Text style={styles.languageText}>Español</Text>
              {userData.language === PrefIdioma.Espanhol && (
                <MaterialIcons name="check" size={24} color={colors.sky500} />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.languageOption} 
              onPress={() => handleLanguageSelect(PrefIdioma.Frances)}
              disabled={isSaving}
            >
              <Text style={styles.languageText}>Français</Text>
              {userData.language === PrefIdioma.Frances && (
                <MaterialIcons name="check" size={24} color={colors.sky500} />
              )}
            </TouchableOpacity>
          </ExpandableSection>

          <ExpandableSection
            title={t('profile.preferences')}
            icon={<MaterialIcons name="settings" size={24} color={colors.sky500} />}
            isExpanded={expandedSection === 'preferences'}
            onPress={() => toggleSection('preferences')}
          >
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>{t('profile.preferredTransport')}</Text>
              <View style={styles.preferenceOptions}>
                {Object.values(PrefTransporte).map((transporte) => (
                  <TouchableOpacity
                    key={transporte}
                    style={[
                      styles.preferenceOption,
                      userData.preferences.transporte === transporte && styles.preferenceOptionSelected
                    ]}
                    onPress={() => handleUpdatePreferences({ transporte })}
                    disabled={isSaving}
                  >
                    <Text style={[
                      styles.preferenceOptionText,
                      userData.preferences.transporte === transporte && styles.preferenceOptionTextSelected
                    ]}>
                      {transporte}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>{t('profile.accommodationType')}</Text>
              <View style={styles.preferenceOptions}>
                {Object.values(PrefAcomodacao).map((acomodacao) => (
                  <TouchableOpacity
                    key={acomodacao}
                    style={[
                      styles.preferenceOption,
                      userData.preferences.acomodacao === acomodacao && styles.preferenceOptionSelected
                    ]}
                    onPress={() => handleUpdatePreferences({ acomodacao })}
                    disabled={isSaving}
                  >
                    <Text style={[
                      styles.preferenceOptionText,
                      userData.preferences.acomodacao === acomodacao && styles.preferenceOptionTextSelected
                    ]}>
                      {acomodacao}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>{t('profile.budget')}</Text>
              <View style={styles.preferenceOptions}>
                {Object.values(PrefOrcamento).map((orcamento) => (
                  <TouchableOpacity
                    key={orcamento}
                    style={[
                      styles.preferenceOption,
                      userData.preferences.orcamento === orcamento && styles.preferenceOptionSelected
                    ]}
                    onPress={() => handleUpdatePreferences({ orcamento })}
                    disabled={isSaving}
                  >
                    <Text style={[
                      styles.preferenceOptionText,
                      userData.preferences.orcamento === orcamento && styles.preferenceOptionTextSelected
                    ]}>
                      {orcamento}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ExpandableSection>

          <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
            <View style={styles.logoutButtonContent}>
              <Feather name="log-out" size={24} color="red" />
              <Text style={styles.logoutButtonText}>{t('common.logout')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray200,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.gray100,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray800,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.gray500,
  },
  content: {
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray800,
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray300,
    marginBottom: 8,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  languageText: {
    fontSize: 16,
    color: colors.gray800,
  },
  preferenceItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  preferenceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  preferenceOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.gray200,
  },
  preferenceOptionSelected: {
    backgroundColor: colors.sky500,
  },
  preferenceOptionText: {
    color: colors.gray800,
    fontSize: 14,
  },
  preferenceOptionTextSelected: {
    color: colors.gray100,
    fontWeight: '500',
  },
  preferenceLabel: {
    fontSize: 14,
    color: colors.gray600,
  },
  preferenceValue: {
    fontSize: 14,
    color: colors.gray800,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: colors.sky500,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: colors.gray100,
    fontWeight: '600',
    fontSize: 16,
  },
});
