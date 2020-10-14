export function getRandomManAvatar () {
    let random= Math.floor(Math.random() * 17);
    let source=`./../../../assets/man'sAvatar/${random}.png`

    return random
  };

  export function getRandomWomanAvatar () {
    let random= Math.floor(Math.random() * 18);
    let source=`./../../../assets/woman'sAvatar/${random}.png`
    return source
  };