const { google } = require('googleapis');
require('dotenv').config();


const credentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });


// Map subjects to their corresponding Google Drive Folder IDs
const SUBJECT_FOLDERS = {
AM1116: '1S1k3Zt9qAg8TJryAPBFrxx5sKxiLukM5',
CE1112: '1K9L29GvxefVqBjk_jW3BJkbJv4dht-F1',
EE1111: 'LahteNQIpLUqCxmnWkZ471wG7X6AGhaS',
EE1115: '112fpwcUJmWNxUA44yCw4yZ81ZRQ4tWqc',
HM1113: '1PePqZc351Wppa21PYfvfpusvLnpCG37J',
MA1109: '1FwaZWHOz0Ok1LGk3RVxhmGRd0IDMnJcs',
PH1110: '1NhJwWc53-lyIU3SBtHfwpSlqInWF2Pae',
PH1114: '1UjBU4ydyCOKZs80bY8qSYY1mXkVrL0-f',
AE1104: '1SEmCuRhf4u__H5EJJfM5wPPneUuwdnvc',
AM1108: '1OBWmbtOBDhN6AF8pz0WWHNVGjIU3dac6',
CH1102: '1q2iuOOPPZY4clc8_n3KJGEguchgO7awL',
CH1106: '1r8yWDtsbplIzCrZMvSFWwpzgMApc2ak6',
CS1103: '1R8CAMW_UVLLpsoxYq3P5TD63XNNB4lD0',
CS1107: '1709Zt2givzXZ25gvbT6osaBY0zZA0acj',
HM1105: '1hYnvCMBc9wzlTGjgJEggpj_RAzQU04-E',
MA1101: '1AYVxgMTs_fZyZu7INS6vCQby0f2yoPjV',

MA2101: '1G0PJvFcbTLCqDqSnPE0aPzuo9uCLaIj6',  
AE2101: '1ClmKhWgxh_8gogOJbhvFRkEwOzC7Pr-5',  
AM2101: '1_wBFEiDt2RJolsIG3Q_uO88iYxFLVZF4',  
AM2102: '12S7wMvB5ii0OXI-OqCh8XVoVP2o_3Xut',  
AE2102: '1y32UDMvy6kraG6BaHK4hFqUwNqHbOWrf',  
AE2171: '1YvCrG8jWZnxxrFPagB16NVlPIPEuPjno',  
AM2171: '1bilVID3jWOxQjyvAISd90it-j6eyl4G0',  
AM2172: '1HUG4cG7slczXDgySCNwJLY0JAO_xEjMr',  
AE2191: '1HpvXaX29BhXfzfILbYjNUDUYucBEY6dt',  
AE2201: '1C_GjNm8oI7_MAZoGsxFTQP8DbYeBXGdS',  
AE2202: '1rBpAiwa3a3wJbhsCh3fZ1AVvlGQZbIMo',  
AE2203: '1MCG-Mi8lMRCiL58cjeMm1j27aa-JQpa8',  
AE2204: '1h7lWDD-62bkqHR8w70TDptem0rdtIHLC',  
AE2205: '1f5JMpqdou8j3Uf78hLC4-GcW7v-suXYd',  
AE2271: '1CjdSKABeJDdL13Elc-Y433Syk-wNWHgi',  
AE2272: '19zGfl3AvNz5MvwXhM3-YTi6qwiLcKivY',  
AE2273: '1-VNRuLrhGXoZ4PURdme8RAWDYC8hpJ0U',  
AE2274: '1gYYr038vZEdHV9mWAp7lAdm-iMc8zEWN',  

AE3273: '1XUrNKzXAOjEaF5TJUxjujAzhJCO7Juiy',  
AE3272: '1oTY7P8kvG1cqBY1234YdwAnye4XhRHvP',  
AE3271: '1D9G_141h-3R7rqNHhkG9DzRnvqz6D_xd',  
AE3205: '195DLp4sqahCI3iKlhd8EutNKLriLaROo',  
AE3204: '1IZBMlFTKHnc5phhj5wS0YrvO6oXd7Gyp',  
AE3203: '1aW0Yb4cAnKWfaMRvilpD7cYrKrLQfKhz',  
AE3202: '1whj2G7ffCDxKJrIPVu5CLcxqIB11ihiI',  
AE3201: '15DDrf4yZGEAJOOUuNJjsqnh6dFQbct5H',  
AE3173: '12Aejaichpy-wLLtoxDnFRvQwcdCtdtva',  
AE3172: '1JyR2OYj7QrF10rheBBPpSlmmP1IJY29U',  
AE3171: '1kfDm1zFvshQDpqoJJCH6jWOSI0hxn5Ne',  
AE3105: '11AxottnJD5EZbZoVHEjD19mVZVGSo28A',  
AE3104: '1cEi46lkOpv7o94YhtKcy7zsu667Y5BBC',  
AE3103: '1lpTVbFdg2fsOvMS9U2zsKiksoEsZe9aR',  
AE3102: '1gzKZY2AzNDSag9DglW_z3mfLJp3EMsNv',  
AE3101: '1MK9GRZqjeDuSUPxwAKmgO26xoGV7ltCJ',  


 
AE4101: '1PTUGr3szNbDiVamko5g_2yOWICU-en9O',  
AE4102: '1aa8NS263iHs1PcSrcbQCH6y1mIP3ewWR',  
CE1: '1sDAnqH4HjjvLvpt516YU26E3Y_9clJ4x',  
OE1: '1xrDwAEzhm1ydc_J0Cwp6UHA5yJHB8_F_',  
AE4171: '1aZTiwUtt_uTazWDtRDlTnX7QcNeK7NBX',  
AE4172: '1QVVjR7UDV3WPuzeoB6kWyO_OqHSS-X3k',  
AE4191: '1UQv3Nsy7Sqcb_Qu5kBPKICXuR2agImF5',  
AE4192: '1MjSpY-HXSd-xMpMhPdKsMKsDux0C6Aww',  
AE4201: '13BQzzfj3i3VtTyvgTQyQyQqRW16lB3NV',  
AE4291: '1pVdlrfAoM6qe9u7qX0oWVGpa5EMDAeno',  
AE4292: '17Fd_x8iON3gnyQxKIu-VwP9bwdoywUV-',  
AE4293: '1tR3wldcLDGv2I8y455hypiuxQxnTGprB',  
CE2: '1HMhR6KhMHhuXhuYSE-rnJeQ81wGhaELq',  
OE2: '10mMOdnM2rp79hFjPzDn4iELgKPdvcDdh',  

};

async function listFiles(subject) {
    try {
      console.log(`Fetching files for subject: ${subject}`); // Log subject
  
      const folderId = SUBJECT_FOLDERS[subject];
      if (!folderId) throw new Error(`Invalid subject code: ${subject}`);
  
      console.log(`Using folder ID: ${folderId}`); // Log folder ID
  
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id, name, webViewLink, webContentLink)',
      });
  
      console.log(`Files found: ${res.data.files.length}`); // Log files count
      return res.data.files;
    } catch (error) {
      console.error('❌ Error fetching files:', error);
      console.error('⚠️ Full Error:', JSON.stringify(error, null, 2)); // Log full error object
      throw error;
    }
  }
  
  

module.exports = { listFiles };
