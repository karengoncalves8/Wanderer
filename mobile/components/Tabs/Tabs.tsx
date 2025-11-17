import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/styles/globalStyles';

export interface TabItem {
  label: string;
  value: string;
}

export interface TabSelectorProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
  underlineColor?: string;
  textStyle?: TextStyle;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  value,
  onChange,
  style,
  activeColor,
  inactiveColor,
  underlineColor,
  textStyle,
}) => {
  const active = activeColor || colors.sky500;
  const inactive = inactiveColor || colors.gray500;
  const underline = underlineColor || active;

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isSelected = value === tab.value;
        return (
          <TouchableOpacity
            key={tab.value}
            onPress={() => onChange(tab.value)}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                textStyle,
                { color: isSelected ? active : inactive },
              ]}
            >
              {tab.label}
            </Text>
            {isSelected && <View style={[styles.underline, { backgroundColor: underline }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 4,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  underline: {
    marginTop: 2,
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
});

export default TabSelector;
