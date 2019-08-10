// Copyright 2011 Timothy J Fontaine <tjfontaine@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE

'use strict';

const NDP = require('native-dns-packet');
// const util = require('util');

/** Represents a packet */
class Packet extends NDP {
  /**
   * The constructor
   * @param {Socket} socket Wrapped socket
   */
  constructor(socket) {
    super();
    this._socket = socket;
  }

  /** Send the packet */
  send() {
    let buff;
    let len;
    let size;

    if (typeof(this.edns_version) !== 'undefined') {
      size = 4096;
    }

    this.payload = size = size || this._socket.base_size;

    buff = this._socket.buffer(size);
    len = Packet.write(buff, this);
    this._socket.send(len);
  }

  /**
   * Parse a raw packet
   * @param {Buffer} msg Packet to parse
   * @param {Socket} socket
   * @return {Packet}
   */
  static parse(msg, socket) {
    // TODO: this is probably a bad way to do this
    let p = NDP.parse(msg);
    p._socket = socket;
    return p;
  }
}

module.exports = Packet;
