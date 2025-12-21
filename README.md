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
- **Sign Up / Login** për **Pacient**  
- **Login** për **Doktor**
- Menaxhim rolesh dhe drejtim në ekranet përkatëse sipas rolit

### 2) Personalized Dashboard
- **Pacient:** listë doktorësh + terminet e ardhshme  
- **Doktor:** terminet e planifikuara + historiku i pacientëve

### 3) Appointment Booking & Management
- Rezervim termini me datë/orë
- Ruajtje e terminit me të dhëna:
  - `createdAt`, `date`, `patientId`, `patientName`, `doctorId`, `doctorName`, `reason`, `status`, `notes`, `time`
- Menaxhim nga doktori:
  - **Approve / Cancel / Reschedule**
- Njoftime për ndryshime të terminit

### 4) Push Notifications & Reminders
- Kujtesa për:
  - Medikamente (Reminder)


### 5) GPS & Hospital Finder
- Kërkim lejesh për lokacion (GPS)
- Marrja e koordinatave

### 6) Analytics (Doctor Dashboard)
- Statistika mbi aktivitetin:
  - numri i pacientëve
  - terminet e përfunduara/anuluara

### 7) Emergency / SOS
- Dërgim alarmi urgjent 
- Njoftim për doktorin/spitalin ose organ tjeter

### 8) E-Recipe (Receta Elektronike)
- Doktori lëshon recetë pas konsultës
- Ruhet në profilin e pacientit
- Përdorshme në farmaci

---

##  Use Cases (Rrjedhat Kryesore të Përdorimit)

### Sign Up (Regjistrim i ri)
**Aktorët:** Pacient  
**Qëllimi:** Krijimi i llogarisë dhe vendosja e rolit  
**Trigger:** “Sign Up” në Welcome/Login Screen  
**Rrjedha:**
1. Përdoruesi zgjedh “Sign Up”
3. Fut Email, Password, Confirm Password
4. Sistemi verifikon fushat dhe krijon llogarinë (Firebase Auth)
5. Ridrejtim te Onboarding
**Alternative:**
- Email ekziston → “Email already in use”
- Password i dobët / mismatch → mesazh gabimi

### Login (Hyrje)
**Aktorët:** Pacient / Doktor i regjistruar  
**Trigger:** “Login”  
**Rrjedha:**
1. Fut Email & Password → Login
2. Authentikim në Firebase
3. Merr profilin e përdoruesit → Home/Dashboard
**Alternative:**
- Credentials gabim → “Invalid email or password”
- Forgot Password → email reset

### Onboarding (Pacient)
**Aktor:** Pacient i ri  
**Trigger:** Pas Sign Up  
**Rrjedha:**
1. Vendos datën e lindjes, gjininë dhe të dhëna të tjera
2. Konfirmon → Home

### Home/Dashboard
**Aktorët:** Pacient / Doktor  
- Pacient: doktorët + opsione të tjera 
- Doktor: Betimi i Hipokratit + opsione të tjera

### Doctor Details
**Aktor:** Pacient  
1. Shfaq emrin, specializimin, foton, disponueshmërinë
2. “Book Appointment” → ekran rezervimi

### Book Appointment
**Aktor:** Pacient  
1. Zgjedh datë/orë
2. Shton opsionalisht koment/arsye
3. “Confirm”
4. Ruhet termini (Firestore) + status
5. Pacienti merr njoftim se a eshte bere rezervimi i terminit
6. Doktori mund ta shohe terminin tek My Appointments
**Alternative:** ora e zënë → gabim

### Doctor Appointment Management
**Aktor:** Doktor  
1. Sheh terminet
2. Hap detajet
3. Approve/Cancel
4. Pacienti mund ta sheh në kohë reale se si ndryshon statusi i terminit
   
### GPS & Hospital Finder
1. Leje GPS
2. Merr koordinata
3. Mundeson lidhjen me google maps

### Push Notifications
1. Gjenerimi i njoftimeve për përdorimin e medikamenteve në kohën e caktuar
2. Shfaqja në ekran

### Profile
- Pacient: Të dhëna personale të pacientit
- Doktor: Të dhëna personale të doktorit
- Opsional: edit profil

### Logout
- Sistemi invalidon session/token dhe ridrejton te Welcome/Login

### Analytics (Doctor)
1. Shfaq statistika
2. Filtrim kohor

### Emergency / SOS
1. Njoftim emergjent
2. Mundesi direkte e komunikimit me organet kompetente

### E-Recipe
1. Doktori krijon recetën
2. Ruhet në profilin e pacientit
3. Përdoret në farmaci

### Medication Reminder
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

---

## Application Flow – Doctor Side

**Rrjedha logjike e përdorimit të aplikacionit për Doktorin**, nga hyrja në sistem deri te menaxhimi i pacientëve dhe shërbimeve.

###  Authentication & Entry
<div align="center">
  <img src="assets/images/common.jpg" width="200" />
      <img src="assets/images/common6.png" width="200" />
      <img src="assets/images/common7.png" width="200" />
      <img src="assets/images/common8.png" width="200" />
</div>

---

###  Doctor Dashboard & Overview
<div align="center">
  <img src="assets/images/doctor1.png" width="180" />
  <img src="assets/images/doctor2.png" width="180" />
  <img src="assets/images/doctor3.png" width="180" />
  <img src="assets/images/doctor4.png" width="180" />
  <img src="assets/images/doctor5.png" width="180" />
  <img src="assets/images/doctor6.png" width="180" />
</div>

---

###  Appointments Management
<div align="center">
  <img src="assets/images/doctor7.png" width="180" />
    <img src="assets/images/doctor10.png" width="180" />
  <img src="assets/images/doctor11.png" width="180" />
  <img src="assets/images/doctor12.png" width="180" />
  <img src="assets/images/doctor13.png" width="180" />
  <img src="assets/images/doctor14.png" width="180" />
  <img src="assets/images/doctor15.png" width="180" />
  <img src="assets/images/doctor16.png" width="180" />
</div>

---

###  Profile & Logout
<div align="center">
  <img src="assets/images/doctor8.png" width="180" />
   <img src="assets/images/doctor9.png" width="180" />
</div>

---

##  Application Flow – Patient Side

**Rrjedha e plotë e përdorimit për Pacientin**, nga regjistrimi deri te kujdesi shëndetësor dhe njoftimet.

###  Authentication & Onboarding
<div align="center">
    <img src="assets/images/common.jpg" width="200" />
   <img src="assets/images/common2.png" width="200" />
    <img src="assets/images/common3.png" width="200" />
     <img src="assets/images/common4.png" width="200" />
      <img src="assets/images/common5.png" width="200" />
      <img src="assets/images/common6.png" width="200" />
      <img src="assets/images/common7.png" width="200" />
      <img src="assets/images/common8.png" width="200" />
</div>

---

###  Home & Doctor Discovery
<div align="center">
  <img src="assets/images/pacient1.png" width="180" />
  <img src="assets/images/pacient2.png" width="180" />
  <img src="assets/images/pacient3.png" width="180" />
  <img src="assets/images/pacient5.png" width="180" />
  <img src="assets/images/pacient6.png" width="180" />
  <img src="assets/images/pacient7.png" width="180" />
  <img src="assets/images/pacient8.png" width="180" />
  <img src="assets/images/pacient9.png" width="180" />
</div>

---

###  Appointment Booking Flow
<div align="center">
  
  <img src="assets/images/pacient4.png" width="180" />
  <img src="assets/images/pacient16.png" width="180" />
  <img src="assets/images/pacient21.png" width="180" />
  <img src="assets/images/pacient22.png" width="180" />
  <img src="assets/images/pacient23.png" width="180" />
  <img src="assets/images/pacient24.png" width="180" />
  <img src="assets/images/pacient25.png" width="180" />
  <img src="assets/images/pacient26.png" width="180" />
  <img src="assets/images/pacient27.png" width="180" />
  <img src="assets/images/pacient28.png" width="180" />
  <img src="assets/images/pacient29.png" width="180" />
</div>

---

###  Medical Records 
<div align="center">
  

  <img src="assets/images/pacient15.png" width="180" />
  <img src="assets/images/pacient10.png" width="180" />
  <img src="assets/images/pacient20.png" width="180" />
</div>

---

### Notifications, Reminders & SOS, GPS
<div align="center">
  <img src="assets/images/pacient11.png" width="180" />
  
   <img src="assets/images/pacient17.png" width="180" />
  <img src="assets/images/pacient14.png" width="180" />
    <img src="assets/images/pacient12.png" width="180" />
  
 
  <img src="assets/images/pacient18.png" width="180" />
  <img src="assets/images/pacient19.png" width="180" />

</div>

---

###  Profile & Logout
<div align="center">
  <img src="assets/images/pacient30.png" width="180" />
  <img src="assets/images/pacient31.png" width="180" />
  <img src="assets/images/pacient32.jpg" width="180" />

</div>

