import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.appTitle}>
          <Text style={styles.titleText}>APP TITLE</Text>
          <Image
            style={styles.plusIcon}
            source={require('zettelkasten/assets/images/plus.png')}            
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.menu}>
          <Image 
            style={styles.folderPlusIcon}
            source={require('zettelkasten/assets/images/folderPlus.png')}
          />
          <Image 
            style={styles.scissorsIcon}
            source={require('zettelkasten/assets/images/scissors.png')}
          />
          <Image 
            style={styles.graphIcon}
            source={require('zettelkasten/assets/images/graph.png')}
          />
          <Image 
            style={styles.searchIcon}
            source={require('zettelkasten/assets/images/search.png')}
          />
          <Image 
            style={styles.gearIcon}
            source={require('zettelkasten/assets/images/gear.png')}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: 50,
    backgroundColor: '#a0a0a0',
  },
  footer: {
    height: 60,
    backgroundColor: '#a0a0a0',
  },

  appTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  titleText: {
    color: '#000',
    fontSize: 36,
    fontWeight: '500',
  },
  plusIcon: {
    width: 36,
    height: 36,
  },

  menu: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  folderPlusIcon: {
    width: 50,
    height: 35,
    resizeMode: 'stretch',
  },
  scissorsIcon: {
    width: 40,
    height: 35,
    resizeMode: 'stretch',
  },
  graphIcon: {
    width: 50,
    height: 35,
    resizeMode: 'stretch',
  },
  searchIcon: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },
  gearIcon: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  }
})