import sqlite3, os, json, sys, js, asyncio, re, micropip, time, pyscript, io, glob, random
import xml.etree.ElementTree as ET
from base64 import b64encode, b64decode
from pyscript import document, when, display, window
from pyodide.http import pyfetch, open_url
from pyodide.ffi import create_proxy
from datetime import datetime, timedelta
from js import alert, prompt, localStorage, Hls, FileReader, console, Uint8Array, File
sys.path.append('/home/pyodide')
import common


epgInput = common.epgInput
epgOutput = common.epgOutput
epgIds = common.epgIds
htmlInput = common.htmlInput
htmlOutput = common.htmlOutput
epgOutput = common.epgOutput
keyCodes = common.keyCodes
Pause = common.Pause
Fullscreen = common.Fullscreen
con = common.con
wsig = common.wsig


def onclick_s1(event):
    #event.target.id
    body = document.querySelector("body")
    if (actives := document.querySelectorAll(".active")):
        for act in actives:
            act.classList.remove('active')
    s1 = body.querySelector('#s1')
    if not (s1.classList.contains('active')): s1.classList.add('active')
    if not (s1i := document.getElementById(event.target.id)):
        console.log(event.target.id)
        console.log('[s1i][click]Error!')
        return
    if not (s1i.classList.contains('active')): s1i.classList.add('active')
    common.checkHtml()
    s1.classList.remove('active')
    s1i.classList.remove('active')
    s1i.classList.add('selected')
    s2 = body.querySelector('#s2')
    if not (s2i := body.querySelector('.actived')):
        s2ii = body.querySelectorAll('#s2 li')
        s2i = s2ii[0]
    if (s2.classList.contains('hidden')): s2.classList.remove('hidden')
    s2.classList.add('active')
    if (s2i.classList.contains('actived')): s2i.classList.remove('actived')
    s2i.classList.add('active')
    common.checkHtml()


@when("keydown", "body")
async def keyHandler(e):
    global keyCodes
    if str(e.keyCode) in keyCodes:
        keyEvent = keyCodes[str(e.keyCode)]
        common.eventHandler(keyEvent)


async def main():
    if not (config := localStorage.getItem("vxConfig")):
        url = prompt("M3U8 URL?", "http://127.0.0.1:8081/Germany_hls.m3u8")
        name = prompt("Name?", "Germany")
        if url and name:
            item = { "name": name, "url": url }
            localStorage.setItem("vxConfig", json.dumps(item))
    if (config := localStorage.getItem("vxConfig")):
        j = json.loads(config)
    try:
        response = await pyfetch(str('http://0.0.0.0:8081/Germany.m3u8'))
        if response.ok:
            data = await response.text()
            parse(str(j['name']), data)
    except:
        return


def temp():
    lines = '<div class="list">'

    lines += '<div class="item" id="expandable"><div class="col head expand"><b>Add New List</b></div><div class="col"><button class="b0"><b>v</b></button></div></div>'
    lines += '<div class="expandable hidden">'
    lines += '<div class="item"><div class="col expand"><div class="row head"><b>M3u8 Liste</b></div><div class="row"><input class="w3" placeholder="List Name ..."> <input class="w5" placeholder="List Url ..."></div></div><div class="col"><button class="b1">Add</button></div></div>'
    lines += '<div class="item"><div class="col expand"><div class="row head"><b>Xtream Account</b></div><div class="row"><input class="w3" placeholder="List Name ..."> <input class="w5" placeholder="Server Url ..."></div><div class="row"><input class="w3" placeholder="User Name ..."> <input class="w3" placeholder="User Password ..."></div></div><div class="col"><button class="b1">Add</button></div></div>'
    lines += '</div>'

    lines += '<div class="item"><div class="col head expand"><b>Edit User Lists</b></div><div class="col"><button class="b0"><b>^</b></button></div></div>'
    lines += '<div class="expandable hidden">'
    lines += '<div class="item"><div class="col expand"><div class="row head"><b>M3u8 Liste</b></div><div class="row"><input class="w3" placeholder="List Name ..."> <input class="w5" placeholder="List Url ..."></div></div><div class="col"><button class="b1">Add</button></div></div>'
    lines += '<div class="item"><div class="col expand"><div class="row head"><b>Xtream Account</b></div><div class="row"><input class="w3" placeholder="List Name ..."> <input class="w5" value="Server Url ..."></div><div class="row"><input class="w3" placeholder="User Name ..."> <input class="w3" placeholder="User Password ..."></div></div><div class="col"><button class="b1_0">Edit</button><button class="b1_1">Delete</button></div></div>'
    lines += '</div>'

    lines += '</div>'



if __name__ == '__main__':
    #console.log(window.App)
    #window.App.request('POST', 'https://www.rokkr.net/api/box/ping', '{"body":{"x": "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"}, "headers":[["Content-Type", "application/json; charset=UTF-8"],["User-Agent", "Rokkr/1.8.3 (android)"], ["Accept", "application/json"], ["Content-Length", "2408"], ["Accept-Encoding", "gzip"], ["Cookie", "lng=en"]]}', create_proxy(ttestt))
    document.body.focus()
    #common.createDB()
    common.load()
    #asyncio.ensure_future(main())
    #console.log(sig)
