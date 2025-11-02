// styles.ts
import { colors } from '@/styles/globalStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
header: {
    flexDirection: 'row',          
    alignItems: 'center',          
    justifyContent: 'space-between',
    marginTop: 50,
    backgroundColor: '#f0f0f0', 
    paddingVertical: 10,  
    gap: 10,                
},
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.gray800
  },
  subTitle:{
    fontSize: 25,
    marginTop: 25,
    color: colors.gray700

  },
  button: {
    width: 140,
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default styles;
