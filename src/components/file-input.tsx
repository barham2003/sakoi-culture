"use client"

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function FileInput() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  return (
    <fieldset className="w-full">
      <label
        htmlFor="voice"
        className="block rounded border border-myblue bg-white p-2 transition-all hover:bg-gray-100"
      >
        {file ? " دانرا" : " دەنگ دابنێ "}
      </label>
      <Input
        onChange={handleFileChange}
        type="file"
        id="voice"
        name="voice"
        accept=".mp3"
        className="hidden"
      />
    </fieldset>
  )
}

export default FileInput
