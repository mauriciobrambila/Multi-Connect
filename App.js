import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, Linking, StatusBar, Modal } from 'react-native';
import { WebView } from 'react-native-webview';

const InstagramIcon = require('./assets/instagram.png');
const FacebookIcon = require('./assets/facebook.png');
const TelegramIcon = require('./assets/telegram.png');
const SpotifyIcon = require('./assets/spotify.png');
const YouTubeIcon = require('./assets/youtube.png');
const TikTokIcon = require('./assets/tiktok.png');
const BoomplayIcon = require('./assets/boomplay.png');
const JooxIcon = require('./assets/joox.png');
const TwitchIcon = require('./assets/twitch.png');
const TwitterIcon = require('./assets/twitter.png');
const WhatsappIcon = require('./assets/whatsapp.png');
const LinkedinIcon = require('./assets/linkedin.png');
const KwaiIcon = require('./assets/kwai.png');
const PinterestIcon = require('./assets/Pinterest.png');

const platforms = [
  { 
    id: 1, 
    name: 'Instagram',
    url: 'https://www.instagram.com',
    appUrl: 'instagram://user?username=instagram', 
    description: 'Notícias Brasileiras e mundiais', 
    icon: InstagramIcon, 
    color: '#E1306C' 
  },  
  { 
    id: 2,
    name: 'Whatsapp', 
    url: 'https://web.whatsapp.com/',
    appUrl: 'whatsapp://send?phone=',
    description: 'Bate papos', 
    icon: WhatsappIcon,
    color: '#25D366' 
  },
  { 
    id: 3,
    name: 'Spotify',
    url: 'https://open.spotify.com',
    appUrl: 'spotify://', 
    description: 'Músicas e podcasts',
    icon: SpotifyIcon, 
    color: '#1DB954' 
  },
  {
    id: 4,
    name: 'Facebook',
    url: 'https://www.facebook.com',
    appUrl: 'fb://facewebmodal/f?href=https://www.facebook.com', 
    description: 'Entretenimento no Brasil e no Mundo',
    icon: FacebookIcon,
    color: '#1877F2'
  },
  { 
    id: 5, 
    name: 'YouTube', 
    url: 'https://www.youtube.com',
    appUrl: 'vnd.youtube://', 
    description: 'Músicas, notícias e lives',
    icon: YouTubeIcon, 
    color: '#FF0000' 
  },
  { 
    id: 6,
    name: 'TikTok', 
    url: 'https://www.tiktok.com', 
    appUrl: 'tiktok://',
    description: 'Vídeos e Músicas',
    icon: TikTokIcon,
    color: '#000000' 
  },
  {
    id: 7,
    name: 'Telegram', 
    url: 'https://web.telegram.org', 
    appUrl: 'tg://', 
    description: 'Notícias do Brasil e do Mundo',
    icon: TelegramIcon, 
    color: '#0088CC'
  },
  { 
    id: 8,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    appUrl: 'linkedin://', 
    description: 'Maior rede social profissional',
    icon: LinkedinIcon, 
    color: '#0077B5' 
  },
  {  
    id: 9,
    name: 'Twitch',
    url: 'https://www.twitch.tv',
    appUrl: 'twitch://',
    description: 'Lives, música e podcasts', 
    icon: TwitchIcon, 
    color: '#9146FF'
  },
  { 
    id: 10, 
    name: 'X (Twitter)',
    url: 'https://x.com/home?lang=pt',
    appUrl: 'twitter://',
    description: 'Notícias, vídeos e enquetes',
    icon: TwitterIcon, 
    color: '#000000' 
  },
  { 
    id: 11,
    name: 'Boomplay',
    url: 'https://www.boomplay.com', 
    description: 'Músicas populares africanas', 
    icon: BoomplayIcon, 
    color: '#00AEF0' 
  },
  { 
    id: 12,
    name: 'Joox',
    url: 'https://www.joox.com/intl/', 
    description: 'Músicas asiáticas', 
    icon: JooxIcon,
    color: '#FF5F5F'
  },
  { 
    id: 13,
    name: 'Kwai',
    url: 'https://www.kwai.com/',
    appUrl: 'kwai://home',
    description: 'Lives, música e podcasts', 
    icon: KwaiIcon, 
    color: '#6c8'
  },
  { 
    id: 14,
    name: 'Pinterest',
    url: 'https://br.pinterest.com/business/hub/',
    appUrl: 'pinterest://',
    description: 'Imagens e Vídeos, conhecidos como "Pins"', 
    icon: PinterestIcon, 
    color: '#6c6759'
  },
];

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const openPlatform = (platform) => {
    setSelectedPlatform(platform);

    if (platform.appUrl) {
      setShowChoiceModal(true);
    } else {
      setCurrentUrl(platform.url);
      setCurrentPlatform(platform);
      setShowWebView(true);
    }
  };

  const handleAppChoice = async (useApp) => {
    setShowChoiceModal(false);
    
    if (useApp) {
      try {
        // Para WhatsApp e Facebook, usamos URLs específicos
        let appUrlToOpen = selectedPlatform.appUrl;
        
        if (selectedPlatform.name === 'Whatsapp') {
          appUrlToOpen = 'whatsapp://send?text=Ola'; // URL específico para WhatsApp
        } else if (selectedPlatform.name === 'Facebook') {
          appUrlToOpen = 'fb://facewebmodal/f?href=https://www.facebook.com'; // abre a home ou uma página
        }
        
        
        const canOpen = await Linking.canOpenURL(appUrlToOpen);  
        if (canOpen) {
          await Linking.openURL(appUrlToOpen);
        } else {
          setCurrentUrl(selectedPlatform.url);
          setCurrentPlatform(selectedPlatform);
          setShowWebView(true);
        }
      } catch (error) {
        console.error('Erro ao abrir app:', error);
        setCurrentUrl(selectedPlatform.url);
        setCurrentPlatform(selectedPlatform);
        setShowWebView(true);
      }
    } else {
      setCurrentUrl(selectedPlatform.url);
      setCurrentPlatform(selectedPlatform);
      setShowWebView(true);
    }
  };
    
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
      
      {showWebView ? (
        <View style={styles.webviewContainer}>
          {/* Header com botão de voltar */}
          <View style={[styles.header, { backgroundColor: currentPlatform?.color || '#2c3e50' }]}>
            <TouchableOpacity 
              onPress={() => setShowWebView(false)} 
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>←Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {currentPlatform?.name || 'Navegador'}
            </Text>
            <View style={styles.headerSpacer} />
          </View>
          
          <WebView 
            source={{ uri: currentUrl }} 
            style={styles.webview}
            startInLoadingState={true}
            allowsInlineMediaPlayback={true}
            javaScriptEnabled={true}
          />
          
          <TouchableOpacity 
            style={styles.floatingBackButton}
            onPress={() => setShowWebView(false)}
          >
            <Text style={styles.floatingBackButtonText}>←</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Tudo em um unico aplicativo!</Text>
            <Text style={styles.subtitle}> Clique em um app para abrir  </Text>
          </View>

          <View style={styles.platformsGrid}>
            {platforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                style={[styles.platformCard, { backgroundColor: platform.color }]}
                onPress={() => openPlatform(platform)}
                activeOpacity={0.8}
              >
                <View style={styles.cardContent}>
                  <Image 
                    source={platform.icon}   // CORRIGIDO
                    style={[styles.platformIcon, styles.iconImage]} 
                  />
                  <Text style={styles.platformName}>{platform.name}</Text>
                  <Text style={styles.platformDescription} numberOfLines={2}>
                    {platform.description}
                  </Text>
                  {platform.appUrl && (
                    <View style={styles.appBadge}>
                      <Text style={styles.appBadgeText}>APP DISPONÍVEL</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Plataformas com ícone "APP DISPONÍVEL" oferecem opção de abrir no aplicativo nativo
            </Text>
          </View>
        </ScrollView>
      )}

      <Modal
        visible={showChoiceModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowChoiceModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
           
            <Text style={styles.modalText}>
              Escolha como você deseja abrir o {selectedPlatform?.name}:
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.appButton]}
                onPress={() => handleAppChoice(true)}
              >
                <Text style={styles.modalButtonText}>  Abrir no Aplicativo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.webviewButton]}
                onPress={() => handleAppChoice(false)}
              >
                <Text style={styles.modalButtonText}>  Abrir no Navegador</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowChoiceModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 18,//tamanho horizontal dos buttons
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 18,//posicionamento dos buttons
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 26,//fonte tudo em 1 aplic
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,//fonte clique em um app
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 8,
  },
  platformsGrid: {//posicao dos buttons
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  platformCard: {
    width: '49%',
    borderRadius: 22,
    marginBottom: 26,//distancia entre buttons
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 15,//tamanho vertical buttons
    alignItems: 'center',//icones
    position: 'relative',
  },
  platformIcon: {//tamanho dos buttons
    width: 50,//icones
    height: 50,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  platformName: {
    color: 'white',
    fontSize: 18,//tamanho nomes dos buttons
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  platformDescription: {
    color: 'rgba(255, 255, 255, 0.8)',//cor descriçao dos buttons
    fontSize: 12,
    textAlign: 'center',
  },
  appBadge: {
    position: 'absolute',//app disponivel
    top: -20,
    right: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  appBadgeText: {
    fontSize: 8,//fonte app disponivel
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  webviewContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 4,
    height: 80,
    paddingTop: 20, // Adicionado para descer o header
  },
  backButton: {
    padding: 2,//button voltar
  },
  backButtonText: {
    color: 'white',//button voltar
    fontSize: 18,
    fontWeight: '700', 
  },
  headerTitle: {
    color: 'white',//button voltar/titulo
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  headerSpacer: {
    width: 45,//posicao titulo no navegador
  },
  // Botão flutuante adicional
  floatingBackButton: {
    position: 'absolute',
    top: 20, // Posicionado mais abaixo para não ficar escondido
    left: 290,
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:10,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingBackButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  footer: {//texto abaixo
    marginTop: -7,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  footerText: {//texto abaixo
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  modalContainer: {//container buttons abrir/cancelar
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white', //buttons abrir/cancela
    borderRadius: 70,
    padding: 15,
    width: '82%',
    alignItems: 'center',//cancelar
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  modalText: {//abrir/cancelar
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',//buttons abrir/cancelar
    marginBottom: 5,
  },
  modalButton: {
    flex: 1,
    padding: 15,//buttons abrir/cancelar
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  appButton: {//button abrir no app
    backgroundColor: '#3498db',
  },
  webviewButton: {//button abrir no navegador
    backgroundColor: '#2ecc71',
  },
  modalButtonText: {//escrita button abrir no navegador/app
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,//buttons abrir/cancelar
  },
  modalButtonSubtext: {
    color: 'white',
    fontSize: 11,
    marginTop: 3,
  },
  cancelButton: {
    padding: 10,//buttons cancelar
  },
  cancelButtonText: {//button cancela
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  iconImage: {
    resizeMode: 'contain',
  },
});