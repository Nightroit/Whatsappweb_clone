function hasher(h1, h2) {
    let hash = ''; 

    for(let i = 0; i < Math.min(h1.length, h2.length); i++) {
        if(h1[i] > h2[i]) {
            hash += h1[i]
        } else {
            hash += h2[i]; 
        }
    }
    return hash; 
}
