import axios from 'axios';

type DogR = {
  message: string;
};

type CatR = {
  file: string;
};

type BunnyR = {
  media: {
    poster: string;
  };
};

type FoxR = {
  image: string;
};

type PandaR = {
  link: string;
};

type DuckR = {
  url: string;
};

export async function dog() {
  const result = await axios.request<DogR>({
    url: 'https://dog.ceo/api/breeds/image/random',
  });

  return result.data.message;
}

export async function cat() {
  const result = await axios.request<CatR>({
    url: 'https://aws.random.cat/meow',
  });
  return result.data.file;
}

export async function bunny() {
  const result = await axios.request<BunnyR>({
    url: 'https://api.bunnies.io/v2/loop/random/?media=gif,png',
  });

  return result.data.media.poster;
}

export async function fox() {
  const result = await axios.request<FoxR>({
    url: 'https://randomfox.ca/floof/',
  });

  return result.data.image;
}

export async function shiba() {
  const result = await axios.request({
    url: 'http://shibe.online/api/shibes',
  });

  return result.data as string;
}

export async function panda() {
  const result = await axios.request<PandaR>({
    url: 'https://some-random-api.ml/img/panda',
  });

  return result.data.link;
}

export async function duck() {
  const result = await axios.request<DuckR>({
    url: 'https://random-d.uk/api/v1/random?type=png',
  });

  return result.data.url;
}
