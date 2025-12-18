# MediCare – Hospital Management & Patient App  
**Course:** Programimi për Pajisje Mobile  
**Version:** 1.0  

> **Platform:** Mobile App (React Native + Expo)  
> **Backend:** Firebase (Auth, Firestore, Storage)

---

## Team (Anëtarët e Grupit)

- **Albena Veseli**  
- **Amela Syla**   
- **Anita Cacaj** 
- **Ardit Hyseni**
- **Dua Gashi**
- **Erzana Beqaj** 

---

## 🧾 Project Overview (Përshkrim i Shkurtër)

**MediCare** është një aplikacion mobil për menaxhimin e plotë të marrëdhënies **pacient–doktor** dhe shërbimeve spitalore.  
Aplikacioni synon të ofrojë një përvojë të thjeshtë, të sigurt dhe efikase për:

- **Pacientët:** rezervim terminësh, akses në dokumente mjekësore, kujtesa për medikamente, gjetje spitalesh, SOS.  
- **Doktorët:** menaxhim orari/termineve, monitorim pacientësh, analiza/raporte mbi aktivitetin.

**Objektivi kryesor** është reduktimi i pritjeve, rritja e organizimit dhe komunikimi më i shpejtë e i sigurt ndërmjet palëve.

---

##  Core Features (Funksionalitetet Kryesore)

### 1) Authentication & Roles
- **Sign Up / Login** për **Pacient** dhe **Doktor**
- Menaxhim rolesh dhe drejtim në ekranet përkatëse sipas rolit

### 2) Personalized Dashboard
- **Pacient:** listë doktorësh + terminet e ardhshme  
- **Doktor:** terminet e planifikuara + historiku i pacientëve

### 3) Appointment Booking & Management
- Rezervim termini me datë/orë
- Ruajtje e terminit me të dhëna:
  - `patientId`, `doctorId`, `datetime`, `status`, `notes`
- Menaxhim nga doktori:
  - **Approve / Cancel / Reschedule**
- Njoftime për ndryshime të terminit

### 4) Medical Documents Management
- Upload dokumente/analiza nga pacienti
- Ruajtje në **Firebase Storage**
- Ruajtje metadata në **Firestore**:
  - `patientId`, `type`, `date`, `fileUrl`
- Qasje për doktorin në historikun e pacientit

### 5) Push Notifications & Reminders
- Kujtesa për:
  - Termine
  - Medikamente (Reminder)
  - Ndryshime & dokumente të reja
- Shfaqje njoftimi dhe hapja e ekranit përkatës pas klikimit

### 6) GPS & Hospital Finder
- Kërkim lejesh për lokacion (GPS)
- Marrja e koordinatave
- Shfaqje e spitaleve më të afërta me opsion navigimi

### 7) Analytics (Doctor Dashboard)
- Statistika mbi aktivitetin:
  - numri i pacientëve
  - terminet e përfunduara/anuluara
- Raporte/grafikë dhe filtrim sipas periudhave

### 8) Emergency / SOS
- Dërgim alarmi urgjent me lokacion GPS
- Opsional: shtim i simptomave/fotos
- Njoftim për doktorin/spitalin

### 9) E-Recipe (Receta Elektronike)
- Doktori lëshon recetë pas konsultës
- Ruhet në profilin e pacientit
- Përdorshme në farmaci

---

##  Use Cases (Rrjedhat Kryesore të Përdorimit)

### Use Case 1 — Sign Up (Regjistrim i ri)
**Aktorët:** Pacient / Doktor  
**Qëllimi:** Krijimi i llogarisë dhe vendosja e rolit  
**Trigger:** “Register” në Welcome/Login Screen  
**Rrjedha:**
1. Përdoruesi zgjedh “Register”
2. Zgjedh rolin: Pacient / Doktor
3. Fut Email, Password, Confirm Password, Display Name
4. Sistemi verifikon fushat dhe krijon llogarinë (Firebase Auth)
5. Ridrejtim te Onboarding ose Home
**Alternative:**
- Email ekziston → “Email already in use”
- Password i dobët / mismatch → mesazh gabimi

### Use Case 2 — Login (Hyrje)
**Aktorët:** Pacient / Doktor i regjistruar  
**Trigger:** “Login”  
**Rrjedha:**
1. Fut Email & Password → Login
2. Authentikim në Firebase
3. Merr profilin e përdoruesit → Home/Dashboard
**Alternative:**
- Credentials gabim → “Invalid email or password”
- Forgot Password → email reset

### Use Case 3 — Onboarding (Pacient)
**Aktor:** Pacient i ri  
**Trigger:** Pas Sign Up  
**Rrjedha:**
1. Vendos datën e lindjes, gjininë, monedhën/vendin
2. Konfiguron preferenca për njoftime (reminders)
3. Opsional: upload foto profili
4. Konfirmon → Home

### Use Case 4 — Home/Dashboard
**Aktorët:** Pacient / Doktor  
- Pacient: doktorët + terminet  
- Doktor: orari + historiku

### Use Case 5 — Doctor Details
**Aktor:** Pacient  
1. Shfaq emrin, specializimin, foton, disponueshmërinë
2. “Book Appointment” → ekran rezervimi

### Use Case 6 — Book Appointment
**Aktor:** Pacient  
1. Zgjedh datë/orë
2. Shton opsionalisht koment/arsye
3. “Confirm”
4. Ruhet termini (Firestore) + status
5. Pacienti merr njoftim
6. Doktori merr njoftim
**Alternative:** ora e zënë → gabim

### Use Case 7 — Doctor Appointment Management
**Aktor:** Doktor  
1. Sheh terminet
2. Hap detajet
3. Approve/Cancel/Reschedule
4. Pacienti njoftohet

### Use Case 8 — Upload Documents
**Aktor:** Pacient  
1. Zgjedh file (kamera/galeria)
2. Upload në Storage
3. Metadata në Firestore
4. Doktori e sheh në historik

### Use Case 9 — GPS & Hospital Finder
1. Leje GPS
2. Merr koordinata
3. Shfaq spitale afër + “Navigate”

### Use Case 10 — Push Notifications
1. Ruajtja e eventeve (termin, dokument, ilaç)
2. Gjenerimi i njoftimeve në kohën e caktuar
3. Shfaqja në ekran
4. Klikimi hap ekranin përkatës

### Use Case 11 — Profile & History
- Pacient: terminet e kaluara + dokumente
- Doktor: pacientët + historiku
- Opsional: edit profil

### Use Case 12 — Logout
- Sistemi invalidon session/token dhe ridrejton te Welcome/Login

### Use Case 13 — Analytics (Doctor)
1. Shfaq statistika
2. Paraqitje me grafikë
3. Filtrim kohor

### Use Case 14 — Emergency / SOS
1. Alarm + lokacion GPS
2. Opsional: simptoma/foto
3. Njoftim emergjent

### Use Case 15 — E-Recipe
1. Doktori krijon recetën
2. Ruhet në profilin e pacientit
3. Përdoret në farmaci

### Use Case 16 — Medication Reminder
1. Pacienti shton ilaçin + orarin
2. Ruhet
3. Dërgohet push notification në kohë

---

##  Architecture (Arkitektura Teknike)

### Frontend (Mobile)
- **React Native** + **Expo**
- Navigim me router (screen-based flow)
- UI komponentë për role të ndryshme (Pacient/Doktor)

### Backend (Firebase)
- **Firebase Authentication**  
  - krijim llogarie, login, role-based access
- **Firestore Database**  
  - ruajtja e profileve, termineve, metadata të dokumenteve, historik
- **Firebase Storage**  
  - ruajtje dokumentesh (analiza, raporte, foto)
- **Notifications & Location**
  - push/local notifications
  - GPS/location permissions & hospital finder

---

## 🛠️ Installation & Run (Udhëzime Instalimi)

### Prerequisites
- **Node.js** (LTS rekomandohet)
- **Expo CLI**
- (Opsionale) Android Studio Emulator / iOS Simulator

### Install dependencies
```bash
npm install
```
Run project
```bash
expo start
```
