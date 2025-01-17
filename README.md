
# 🤖 Lune Bot

> **A Multifunctional WhatsApp Bot**  
> Powered by **Node.js** and designed to bring fun, utility, and convenience to your WhatsApp groups and personal chats.

> **Important**: As of 2023, this bot is no longer maintained and is considered **deprecated**. It may not work with the latest versions of WhatsApp or its API, and no further updates or support will be provided.

---

<p align="center">
  <img src="media/lune-bot.jpg" alt="Lune Bot Logo" width="250"/>
</p>

## ✨ Features

- 🎇 **Stickers**: Convert images/GIFs/videos into stickers, remove backgrounds, etc.
- 📸 **Images**: Fetch random anime images, wallpapers, Pinterest results, etc.
- 📥 **Downloader**: Download videos from YouTube, TikTok, Facebook, Instagram, etc.   
- 🎮️ **Fun & Games**: Random jokes, memes, quotes, and minigames.  
- 🛠️ **Utilities**: URL shortener, weather info, AFK mode, QR codes, background removal, etc.  
- 🧪 **XP & Leveling**: Earn XP, rank up, leaderboards, daily rewards, in-bot economy.
- 🔰 **Admin Tools**: Ban/unban, promote/demote, group settings, and more. 
- ⚙️ **Configuration**: Toggle, anti-flood, anti-spam, prefix changes, etc.
- 🧑🏻‍💻 **Developer Commands**: Evaluate code, run shell commands, broadcast, manage blocks, etc.

---

## ⚠️ Deprecated Notice

> **⚠️ This project is no longer maintained.**  
> **Lune Bot has been officially deprecated and discontinued (2019–2023).**  

While you are welcome to explore, fork, and use the code, please note that:
- **No further updates** will be provided.
- **No support** is available for this project.
- Compatibility with future versions of WhatsApp is **not guaranteed**.

---

## 📋 Table of Contents

1. [Introduction](#-lune-bot)
2. [Features](#-features)
3. [Deprecated Notice](#️-deprecated-notice)
4. [Requirements](#-requirements)
5. [Installation Steps](#-installation-steps)
   - [Step 1: Clone the Repository](#step-1-clone-the-repository)
   - [Step 2: Install Dependencies](#step-2-install-dependencies)
6. [Running the Bot](-running-the-bot)
7. [Auto-Start on Reboot](#-auto-start-on-reboot)
8. [Usage](#-usage)
9. [Command Categories](#-command-categories)
   - [Sticker Menu 🎇](#sticker-menu-)
   - [Images Menu 📸](#images-menu-)
   - [Downloader Menu 📥](#downloader-menu-)
   - [Fun Menu 🎮️](#fun-menu-)
   - [Utility Menu 🛠️](#utility-menu-)
   - [XP Menu 🧪](#xp-menu-)
   - [Marry Menu 💕](#marry-menu-)
   - [Admin Menu 🔰](#admin-menu-)
   - [Config Menu ⚙️](#config-menu)
   - [About Menu 📃](#about-menu-)
   - [Developer Menu 🧑🏻‍💻](#developer-menu-)
10. [Settings](#️-lune-bot-settings)
11. [API Keys](#-api-keys)
12. [Important Notes](#important-notes)
13. [License](#license)

---

## ⚙ Requirements

- [Node.js](https://nodejs.org/download/release/v16.20.1/) **16.20.1** or later (recommended version used during development)
- [PM2](https://pm2.keymetrics.io/) for process management
- A valid **WhatsApp** account (phone number)
- (Optional) [FFmpeg](https://ffmpeg.org/) for media/sticker conversion

---

## 🚀 Installation Steps

### Step 1: Clone the Repository
Download the Lune Bot code to your local machine:
```bash
git clone https://github.com/luizbizzio/lune-bot.git
cd lune-bot
```

### Step 2: Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```

---

## ⚡ Running the Bot

The repository includes a `process.json` configuration file for PM2, which simplifies running and managing the bot.

### Start the Bot
To start the bot using PM2:
```bash
pm2 start process.json
```

### Monitor the Bot
View real-time logs and status:
```bash
pm2 monit
```

### Stop or Restart the Bot
Stop the bot:
```bash
pm2 stop lune-bot
```
Restart the bot:
```bash
pm2 restart lune-bot
```

---

## 🔄 Auto-Start on Reboot

To make the bot start automatically after a system reboot:
```bash
pm2 startup
pm2 save
```

## 💡 Usage

- **Command Prefix**: By default, Lune Bot uses `.` as its prefix. You can change this (see the [Config Menu ⚙️](#-config-menu-⚙️)).  
- **Command Format**:
  ```bash
  .<command> [arguments]
  ```
  Example:
  ```bash
  .ping
  .ytmp3 <YouTube link>
  .hug @user
  ```
- **Mentions**: Some commands require you to mention a user, e.g. `@1234567890`.

---

## 🗂 Command Categories

Below is a quick reference to the menus.

### Sticker Menu 🎇  

| **Command**                  | **Description**                                                                   |
|------------------------------|-----------------------------------------------------------------------------------|
| `.stk <Image/GIF/Video>` | Convert images, GIFs, or videos into stickers.                                  |
| `.nobg <Image>`       | Remove the background from an image and send it as a sticker.                     |
| `.stkmake <Word>`     | Create stickers based on the provided words.                                      |
| `.emoji <Emoji>`      | Convert emojis into stickers.                                                    |
| `.mixemoji <Emoji> + <Emoji>` | Mix two emojis into one sticker.                                          |
| `.toimg <Sticker>`    | Convert a sticker into an image.                                                  |
| `.ttp <Phrase>`       | Convert a phrase into a sticker.           

---

### Images Menu 📸  

| **Command**                     | **Description**                                                                   |
|---------------------------------|-----------------------------------------------------------------------------------|
| `.meme <Image> <Text1 / Text2>` | Create an image with custom captions.                                      |
| `.comment <Image> <Text1 / Text2>` | Create a YouTube comment-style image.                                     |
| `.wasted <Image>`        | Create an image in the style of GTA V.                                           |
| `.trigger <Image>`       | Creates a triggered-style animated sticker.                                      |
| `.gamer <Name>`          | Creates a gamer-style image.                                                     |
| `.cmm <Text>`            | Create a "Change My Mind" style image.                                           |
| `.img <Word>`            | Send images based on the provided words.  

---

### Downloader Menu 📥  

| **Command**                     | **Description**                                                                   |
|---------------------------------|-----------------------------------------------------------------------------------|
| `.play <Video Name/Link>` | Download music from YouTube based on the provided search or link.                 |
| `.video <Video Name/Link>` | Download YouTube videos based on the provided search or link.                    |
| `.tomp3 <Video>`         | Convert a video to MP3 format.                                                   |
| `.audio <Audio> <Effect>` | Adds audio effects to the provided audio file.                                   |
| `.lyrics <Music Name>`   | Download lyrics based on the provided music name.  
---

### Fun Menu 🎮️  

| **Command**                  | **Description**                                                                   |
|------------------------------|-----------------------------------------------------------------------------------|
| `.gsbl <Image>`       | Get Stick Bugged Lol!                                                            |
| `.pixelgen <Seed>`    | Generates a random pixelated avatar.                                             |
| `.botgen <Seed>`      | Generates a random bot.                                                          |
| `.avatargen <Seed>`   | Generate a random avatar (version 1).                                            |
| `.avatargen2 <Seed>`  | Generate a random avatar (version 2).                                            |
| `.facegen`            | Uses A.I. to generate a non-existent face.                                       |
| `.moe`                | Uses A.I. to spawn an anime girl.                                                |
| `.gift`               | Shows a possible gift you will get.                                              |
| `.curio`              | Reports a random curiosity.                                                      |
| `.reverse <Text>`     | Mirrors the text, phrase, or written word.                                       |
| `.ship <Name 1 / Name 2>` | Love test.                                                                     |
| `.cute`               | Cuteness test.                                                                   |
| `.gender <Name>`      | Indicates whether the specified name is more commonly used by men or women.      |
| `.death <Name>`       | Predicts the average lifespan for a person with the specified name.              |
| `.rps <Rock/Paper/Scissors>` | Play Rock-paper-scissors.                                                |
| `.roll <Nº>d<Nº>+<prof>` | Play dice (e.g., 1d20+2 or 1d20). Max 100 dices, 1,000 faces, 10,000 proficiency. |
| `.dice`               | Throw a dice.                                                                    |
| `.flip`               | Play heads or tails.                                                             |
| `.pokedex <Pokemon>`  | Shows all information for the specified Pokémon.                                 |
| `.pokemon`            | Generates random Pokémon stickers.                                               |
| `.fox`                | Generates random fox stickers.                                                   |
| `.cat`                | Generates random cat stickers.                                                   |
| `.dog`                | Generates random dog stickers.                                                   |
| `.hug @user`          | Hug someone.                                                                     |
| `.slap @user`         | Slap someone.                                                                    |
| `.kiss @user`         | Kiss someone.                                                                    |
| `.kill @user`         | Kill someone.                                                                    |
| `.sleep`              | Time to sleep!                                                                   |
| `.wakeup`             | Time to wake up!                                                                 |
| `.shrug`              | Shrug.   

---

### Utility Menu 🛠️  

| **Command**                  | **Description**                                                                   |
|------------------------------|-----------------------------------------------------------------------------------|
| `.tts <En> <Text>`    | Converts text to audio.                                                           |
| `.translate <En> <Text>` | Translates the text into different languages.                                   |
| `.weather <City>`     | Reports the weather for the specified location.                                   |
| `.sl <Link>`          | Shortens the provided link.                                                      |
| `.scan <Document/Link>` | Scans the file or website for viruses.                                           |
| `.barcode <Text>`     | Converts text into a barcode.                                                    |
| `.qrcode <Text>`      | Converts text into a QR code.                                                    |
| `.readqr <Image>`     | Reads the QR code from an image.                                                 |
| `.write <Text>`       | Handwrites the specified text.                                                   |
| `.ip <Website>`       | Provides IP and site data for the specified website.                             |
| `.exchange`           | Shows the current exchange rates for Dollar, Euro, and Bitcoin.                  |
| `.mi <Audio/Video>`   | Identifies the song in the sent audio or video.                                  |
| `.upimg`              | Uploads the provided image to the cloud.                                         |
| `.ping`               | Displays Lune Bot's response time.     

---

### XP Menu 🧪  

| **Command**                 | **Description**                                                                   |
|-----------------------------|-----------------------------------------------------------------------------------|
| `.xp`                | Shows the XP rank of the user.                                                   |
| `.casino <XP>`       | Bet XP in the casino.                                                            |
| `.roulette <XP>`     | Bet XP on Roulette.                                                              |
| `.profile`           | Shows your profile data.                                                         |
| `.level`             | Generates an image displaying your XP amount.                                    |
| `.players`           | Shows the top 10 players in the XP system.                                       |
| `.give @user <XP>`   | Transfer a certain amount of XP to the mentioned user.                           |
| `.tier`              | Shows all existing tiers in the XP system.   

---

### Marry Menu 💕  

| **Command**               | **Description**                                                                   |
|---------------------------|-----------------------------------------------------------------------------------|
| `.marry @user`     | Send a marriage proposal to the mentioned user.                                   |
| `.am @user`        | Accept a marriage proposal from the user who sent it to you.                      |
| `.couple @user`    | Shows information about your current marriage.                                    |
| `.divorce`         | Ends your current marriage.              

---

### Admin Menu 🔰

| **Command**                    | **Description**                                                                 |
|--------------------------------|---------------------------------------------------------------------------------|
| `.add <XXXXXXXXXXXXX>`  | Adds participants to the group.                                                |
| `.ban @user`            | Removes members from the group (via mention or message reply).                 |
| `.promote @user`        | Promotes a group member to admin.                                              |
| `.demote @user`         | Demotes an admin to regular member.                                            |
| `.linkgroup`            | Generates a group invite link.                                                 |
| `.revoke`               | Resets the group invite link.                                                  |
| `.giveaway <Time> + <Prize>` | Creates a giveaway for group participants.                                 |
| `.participate`          | Participate in the group giveaway.                                             |
| `.welcome <On/Off>`     | Enables or disables automatic welcome messages.                                |
| `.gamexp <On/Off>`      | Enables or disables the XP system in the group.                                |
| `.antilink <On/Off>`    | Enables or disables WhatsApp link protection in the group.                     |
| `.autostk <On/Off>`     | Enables or disables automatic sticker creation in the group.                   |
| `.adminonly <On/Off>`   | Restricts the ability to send messages in the group to admins only.            |
| `.setprefix <prefix>`   | Changes the bot's prefix in the group.                                         |
| `.del <Mark message>`   | Deletes the specified message (sent by Lune Bot).                              |
| `.tagall`               | Mentions all group members.                                                    |
| `.adminlist`            | Mentions all group admins.                                                     |
| `.groupinfo`            | Displays group data and activated features.                                    |

---

### Config Menu ⚙️

| **Command**                     | **Description**                                                              |
|---------------------------------|------------------------------------------------------------------------------|
| `.setprefix <prefix>`    | Change Lune Bot's command prefix in private chats.                           |
| `.autostk <On/Off>`      | Enables or disables automatic sticker creation in private chats.             |
| `.setlang <en_US/es_ES/pt_BR>` | Changes Lune Bot's language.                                            |


---

### About Menu 📃
| **Command**               | **Description**                        |
| ------------------------- | -------------------------------------- |
| `.info`           | Info about the bot.                    |
| `.creator`        | Bot developer’s contact.               |
| `.bug <message>`  | Report a bug.                          |
| `.suggest <msg>`  | Send a suggestion.                     |
| `.changelog`      | Show the latest updates.               |

---

### Developer Menu 🧑🏻‍💻

| **Command**                  | **Description**                                                                 |
|------------------------------|-------------------------------------------------------------------------------|
| `.sys`                | Displays system information.                                                 |
| `.restart`            | Restarts the Lune Bot system.                                                |
| `.printwpp`           | Shows the WhatsApp Web interface being used.                                 |
| `.autopromote`        | Automatically promotes yourself to admin.                                    |
| `.autodemote`         | Automatically demotes yourself from admin.                                   |
| `.join`               | Allows Lune Bot to join a group.                                             |
| `.say <message>`      | Lune Bot repeats the provided message.                                       |
| `.axp @user <XP>`     | Adds or removes XP from the mentioned user.                                  |
| `.aremove @user`      | Removes XP from the mentioned user.                                          |
| `.leave`              | Lune Bot leaves the current group.   

---


## 🛠️ Lune Bot Settings

The `settings` file contains crucial configurations for Lune Bot, including default preferences, spam protection, limits, and API keys required for external services. Below is a detailed explanation of each setting.


| **Key**               | **Description**                                                                                   |
|-----------------------|---------------------------------------------------------------------------------------------------|
| `owners`              | List of user numbers who are bot owners (with access to all commands).                                |
| `defaultPrefix`       | The default prefix used for bot commands.                                                         |
| `only_groups`         | Specifies if the bot operates only in groups (`true` or `false`).                                 |
| `antispam`            | Enables or disables spam protection.                                                              |
| `save_musics`         | Specifies if downloaded music should be saved (`true` or `false`).                                |
| `spam_limit`          | Maximum number of consecutive messages allowed before activating spam protection.                 |
| `spam_delay`          | Time (in milliseconds) between messages before they are considered spam.                          |
| `block_delay`         | Time (in milliseconds) a user will be blocked after hitting the spam limit.                       |

---

## 🔑 API Keys

These keys are used to access external services. Ensure they are kept secure, as they provide access to specific functionalities.

| **Service**           | **Key**                                                                                          | **Description**                                                                                                                                                        |
|-----------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `virus_total`         | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                | Used to scan links or files for viruses.                                                                                                                          |
| `bitly`               | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                                       | Used to shorten URLs via **Bitly**.                                                                                                                               |
| `imgbb`               | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                                               | Used to upload images to the cloud via **ImgBB**.                                                                                                                 |
| `weather_api`         | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                                                | Used to fetch real-time weather information.                                                                                                                      |
| `ip_quality_score`    | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                                               | Used to analyze IP and URL security data.                                                                                                                         |
| `genius_lyrics`       | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                               | Used to fetch song lyrics from **Genius Lyrics**.                                                                                                                 |
| `chatgpt`             | `xx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                            | Used to access **OpenAI's ChatGPT API** for chatbot interactions.                                                                                                |
| `acrcloud`            |                                                                                                  | **ACRCloud** service configuration, used to identify songs from audio:                                                                                           |
|                       | - `host`: `identify-region-1.acrcloud.com`                                                                                          | The host used for identification.                                                                                                                               |
|                       | - `api_key`: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                                                                      | The API key for authentication.                                                                                                                                  |
|                       | - `api_secret`: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                                                            | The API secret for authentication.                                                                                                                              |

---

## Important Notes

1. **Keep API Keys Secure**: These keys grant access to critical external services and should not be shared publicly.
2. **Default Configuration**: The default prefix is `.`. You can change it using the appropriate bot command (`setprefix`).
3. **Spam Protection**: The spam protection system can be enabled/disabled and configured as needed.

---

## 📄License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
