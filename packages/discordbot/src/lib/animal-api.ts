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
  try {
    const result = await axios.request<DogR>({
      url: 'https://dog.ceo/api/breeds/image/random',
    });

    return result.data.message;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function cat() {
  try {
    const result = await axios.request<CatR>({
      url: 'https://aws.random.cat/meow',
    });
    return result.data.file;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function bunny() {
  try {
    const result = await axios.request<BunnyR>({
      url: 'https://api.bunnies.io/v2/loop/random/?media=gif,png',
    });

    return result.data.media.poster;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function fox() {
  try {
    const result = await axios.request<FoxR>({
      url: 'https://randomfox.ca/floof/',
    });

    return result.data.image;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function shiba() {
  try {
    const result = await axios.request({
      url: 'http://shibe.online/api/shibes',
    });

    return result.data as string;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function panda() {
  try {
    const result = await axios.request<PandaR>({
      url: 'https://some-random-api.ml/img/panda',
    });

    return result.data.link;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function duck() {
  try {
    const result = await axios.request<DuckR>({
      url: 'https://random-d.uk/api/v1/random?type=png',
    });

    return result.data.url;
  } catch (error) {
    throw new Error(error as string);
  }
}
