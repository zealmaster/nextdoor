'use client'
import Image from 'next/image'
import GeoLocation from './components/geolocation'
import AudioRecorder from './components/microphone'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GeoLocation />
      <AudioRecorder />
    </main>
  )
}
