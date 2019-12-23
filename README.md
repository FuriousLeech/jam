<div align="center">
  <br />
  <p>
    <img src="https://i.imgur.com/cLLrI4M.png" width="150" alt="jam" />
  </p>
  <br />
  <p>
    <a href="https://discord.gg/deb3aXu"><img src="https://discordapp.com/api/guilds/653142786194931712/embed.png" alt="Discord server" /></a>
    <a href="https://david-dm.org/zaneslick/jam"><img src="https://david-dm.org/zaneslick/jam/status.svg" alt="Dependencies" /></a>
    <a href="https://david-dm.org/zaneslick/jam?type=dev"><img src="https://david-dm.org/zaneslick/jam/dev-status.svg" alt="Dev Dependencies" /></a>
  </p>
</div>

## About

Jam is a man-in-the-middle proxy server that allows you to easily interact with [Animal Jam](http://animaljam.com).

- Web interface
- Plugin support
- Chat commands

Brought you by **Team Slick**! Follow us on Instagram to keep up to date with updates and releases. 

- [Zane](https://www.instagram.com/zane.slick)
- [Xyo](https://www.instagram.com/xyo.slick)

## Install

**Note**: Make sure you have the latest version of [Nodejs](https://nodejs.org/en/) installed before running Jam.

1. Clone the repository to your computer

```bash
git clone https://github.com/zaneslick/jam.git/
```

2. Change directory into the new `jam` directory

```bash
cd jam
```

3. Install the required dependencies

```bash
npm install
# or yarn
```

## Setup

### Video

[![Jam Setup](https://i.imgur.com/v1WynfR.png)](https://streamable.com/5agkh)


Now that Jam is installed, you will need to set up your `config.json` file and windows `hosts` file.

### Setting up the configuration

1. Open the jam folder in your file explorer
2. Locate the `config` directory and open up `config.json` in your favourite text editor.

Your `config.json` file should look something like this:

```json
{
  "jam": {
    "name": "Jam",
    "port": 443,
    "debug": true,
    "remote": {
      "host": "34.215.158.206", 
      "port": 443
    }
  },
  "settings": {
    "prefix": "!"
  }
}
```
Don't let this scare you, it's actually very simple.

`name` is the name of the proxy server.  
`port` is the port number that proxy server will serve on.  
`debug` is the debug toggle to log packets in the console.  
`remote.host` is the animal jam server address that jam will connect too.  
`remote.port` is the animal jam server port that jam will connect too.

### Setting up windows hosts

1. Press the Windows key.
2. Type Notepad in the search field.
3. In the search results, right-click Notepad and select Run as administrator.
4. From Notepad, open the following file: `c:\Windows\System32\Drivers\etc\hosts`

Your `hosts` file should look something like this:

```
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
```

Now you will have to include Animal Jam's server address string inside the `hosts` file.

```
127.0.0.1  aws-or-prod-iss01.animaljam.com
127.0.0.1  aws-or-prod-iss02.animaljam.com
```

Once you have done this, you can now save the file and exit.

## Run

After setting up the `config.json` and `hosts` file, Jam is ready to go. To run Jam, simply use the command `npm start` in the console.

Now you can login and play!

