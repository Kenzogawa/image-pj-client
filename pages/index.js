import Head from 'next/head';
import styles from '../styles/Home.module.css';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Item from './components/item';
import Footer from './components/footer';

const socket = io('http://localhost:5000');

export default function Home() {
  const [imgFileName, setImgFileName] = useState('');
  const [thumFileName, setThumFileName] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log(`[${socket.id}] サーバーと接続しました！`);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log(`[${socket.id}] サーバーと切断しました！`);
    });

    // サーバーから受信
    socket.on('img_data', ([imgBinary, fileName], ack) => {
      if (fileName.match(/_Thum/)) {
        setThumFileName(fileName.split('.').slice(0, -1).join('.'));
      } else {
        setImgFileName(fileName.split('.').slice(0, -1).join('.'));
      }
      console.log(fileName);
      ack(`☆${fileName}を更新しました`); //サーバー側へ戻す
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('img_data');
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>タイトル</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta http-equiv='Content-Language' content='ja' />
        <meta property='og:title' content='タイトル' key='title' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className={styles.items}>
        <Item name='画像1' img={'img1'} thum={'img1_Thum'} />
        <Item name='画像2' img={'img2'} thum={'img2_Thum'} />
        <Item name='画像3' img={'img3'} thum={'img3_Thum'} />
        <Item name='画像4' img={'img4'} thum={'img4_Thum'} />
      </div>
      <Footer />
    </div>
  );
}
