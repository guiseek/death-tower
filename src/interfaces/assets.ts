import { AudioType } from "./audio";

export type ImageType = 'player'

export interface AssetTypeConfig<T extends string> {
  type: T
  name: string
  url: URL
}

export type AssetConfig<T extends string> = {
  [key in T]: AssetTypeConfig<key>
}

export interface AssetsConfig {
  images: AssetConfig<ImageType>[]
  audios: AssetConfig<AudioType>[]
}

const assets: AssetsConfig = {
  images: [
    
  ],
  audios: [
    
  ]
}