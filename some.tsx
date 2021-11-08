const html = data.map((cars) => {
    let screenWidth = window.innerWidth;

    return `
        <div class='cars'>
            <img 
                class='image' 
                src='${
                    screenWidth >= 480 ? cars.media[0].url : cars.media[1].url
                }'>
            </img>
            <div class='info'>
                <h1 class='title'>${cars.name}</h1>
                <h3 class='price'>From ${cars.price}</h3>
                <h3 class='motto'>The pinnacle of refined capability</h3>
            </div>
        </div>
  `;
});
