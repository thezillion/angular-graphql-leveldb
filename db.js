const level = require('level')
const sublevel = require('level-sublevel')

const db = sublevel(level('./db', { valueEncoding: 'json' }))

const bearsdb = db.sublevel('bears')
const regionsdb = db.sublevel('regions')

var regions = [
    {
        key: 'northamerica',
        value: { name: 'North America' }
    },
    {
        key: 'southamerica',
        value: { name: 'South America' }
    },
    {
        key: 'africa',
        value: { name: 'Africa' }
    }
];

var bears = [
    {
        key: 'steve',
        value: { type: 'grizzly', region: 'northamerica' }
    },
    {
        key: 'bob',
        value: { type: 'teddy', region: 'southamerica' }
    },
    {
        key: 'jason',
        value: { type: 'grizzly', region: 'africa' }
    }
];

// regionsdb.put('northamerica', { name: 'North America' }, function(err) {
//     bearsdb.put('steve', { type: 'grizzly', region: 'northamerica' },
//         function() {}
//     )
// })

bears.forEach((b) => {
    bearsdb.put(b.key, b.value, function(err) {
        if (err)
            console.log('Error adding to db '+err);
    })
});

regions.forEach((r) => {
    regionsdb.put(r.key, r.value, function(err) {
        if (err)
            console.log('Error adding to db '+err);
    })
});

var b = []
var stream = bearsdb.createReadStream()
stream.on('data', function(bear) {
    console.log(bear)
})