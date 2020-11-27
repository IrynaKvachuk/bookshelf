const initialBooks = {
    list: {
        0: {
            'title': 'Cloud Atlas',
            'id': '0',
            'author': 'David Mitchell',
            'image': 'https://upload.wikimedia.org/wikipedia/en/3/38/Cloud_atlas.jpg',
            'plot': 'The book consists of six nested stories; each is read or' +
                'observed by a main character of the next, thus they progress in time' +
                'through the central sixth story. The first five stories are each interrupted' +
                'at a pivotal moment. After the sixth story, the others are closed in reverse' +
                'chronological order, with the main character reading or observing the chronologically' +
                'earlier work in the chain. Each story contains a document, movie, or tradition that' +
                'appears in an earlier story.'
        },
        1: {
            'title': 'The Shadow over Innsmouth',
            'id': '1',
            'author': 'H. P. Lovecraft',
            'image': 'https://upload.wikimedia.org/wikipedia/en/d/d5/' +
                'Shadow_Over_Innsmouth_%28dust_jacket_-_first_edition%29.jpg',
            'plot': 'The narrator explains how he instigated a secret investigation' +
                'of the ruined town of Innsmouth, Massachusetts, by the U.S. government. He proceeds to' +
                'describe in detail the events surrounding his initial interest in the town, which' +
                'lies along the route of his tour across New England, taken when he was twenty-one.' +
                'While he waits for the bus that will take him to Innsmouth, he busies himself' +
                'in the neighboring Newburyport by gathering information on the town from the locals;' +
                'all of it having superstitious overtones. The narrator finds Innsmouth to be a mostly' +
                'deserted fishing town, full of dilapidated buildings and people who walk with a distinctive' +
                'shambling gait and have \'queer narrow heads with flat noses and bulgy, stary eyes\'.'
        },
        2: {
            'title': 'The master and Margarita',
            'id': '2',
            'author': 'Mikhail Bulgakov',
            'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/MasterandMargaritaFirstEdition.jpg' +
                '/800px-MasterandMargaritaFirstEdition.jpg',
            'plot': 'The novel has two settings. The first is Moscow during the 1930s,' +
                'where Satan appears at Patriarch\'s Ponds as Professor Woland. He is accompanied by Koroviev,' +
                'a grotesquely-dressed valet; Behemoth, a black cat; Azazello, a hitman; and Hella, a female vampire.' +
                'Part two introduces Margarita, the Master\'s mistress, who refuses to despair of her lover' +
                'and his work. Azazello gives her a magical skin ointment and invites her to the Devil\'s' +
                'midnight Good Friday ball, where Woland gives her the chance to become a witch.'
        }
    },
    lastId: 2
}

if (localStorage.getItem('books') === null) {
    localStorage.setItem('books', JSON.stringify(initialBooks));
}