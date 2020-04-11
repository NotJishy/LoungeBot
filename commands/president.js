exports.president = function (msg, Discord, red, blue, grey) {
    let presList = [
        {
            "name": "George Washington",
            "party": "null"
        },
        {
            "name": "John Adams",
            "party": "F"
        },
        {
            "name": "Thomas Jefferson",
            "party": "DR"
        },
        {
            "name": "James Madison",
            "party": "DR"
        },
        {
            "name": "James Monroe",
            "party": "DR"
        },
        {
            "name": "John Quincy Adams",
            "party": "DR"
        },
        {
            "name": "Andrew Jackson",
            "party": "D"
        },
        {
            "name": "Martin Van Buren",
            "party": "D"
        },
        {
            "name": "William Henry Harrison",
            "party": "W"
        },
        {
            "name": "John Tyler",
            "party": "W"
        },
        {
            "name": "James K Polk",
            "party": "D"
        },
        {
            "name": "Zachary Taylor",
            "party": "W"
        },
        {
            "name": "Millard Fillmore",
            "party": "W"
        },
        {
            "name": "Franklin Pierce",
            "party": "D"
        },
        {
            "name": "James Buchanan",
            "party": "D"
        },
        {
            "name": "Abraham Lincoln",
            "party": "R"
        },
        {
            "name": "Andrew Jackson",
            "party": "R"
        },
        {
            "name": "Ulysses S Grant",
            "party": "R"
        },
        {
            "name": "Rutherford B Hayes",
            "party": "R"
        },
        {
            "name": "James A Garfield",
            "party": "R"
        },
        {
            "name": "Chester A Arthur",
            "party": "R"
        },
        {
            "name": "Grover Cleveland",
            "party": "D"
        },
        {
            "name": "Benjamin Harrison",
            "party": "R"
        },
        {
            "name": "William McKinley",
            "party": "R"
        },
        {
            "name": "Theodore Roosevelt",
            "party": "R"
        },
        {
            "name": "William H Taft",
            "party": "R"
        },
        {
            "name": "Woodrow Wilson",
            "party": "D"
        },
        {
            "name": "Warren Harding",
            "party": "R"
        },
        {
            "name": "Calvin Coolidge",
            "party": "R"
        },
        {
            "name": "Herbert Hoover",
            "party": "R"
        },
        {
            "name": "Franklin Delano Roosevelt",
            "party": "D"
        },
        {
            "name": "Harry S Truman",
            "party": "D"
        },
        {
            "name": "Dwight D Eisenhower",
            "party": "R"
        },
        {
            "name": "John F Kennedy",
            "party": "D"
        },
        {
            "name": "Lyndon B Johnson",
            "party": "D"
        },
        {
            "name": "Richard Nixon",
            "party": "R"
        },
        {
            "name": "Gerald Ford",
            "party": "R"
        },
        {
            "name": "Jimmy Carter",
            "party": "D"
        },
        {
            "name": "Ronald Raegan",
            "party": "R"
        },
        {
            "name": "George Bush",
            "party": "R"
        },
        {
            "name": "Bill Clinton",
            "party": "D"
        },
        {
            "name": "George W Bush",
            "party": "R"
        },
        {
            "name": "Barack Obama",
            "party": "D"
        },
        {
            "name": "Donald Trump",
            "party": "R"
        }
    ]

    let selectPres = presList[Math.floor(Math.random() * presList.length)];

    var party = ""
    if (selectPres.party == "R") {
        party = red
    } else if (selectPres.party == "D") {
        party = blue
    } else if (selectPres.party == "DR") {
        party = '#ffffff'
    } else if (selectPres.party == "W") {
        party = '#F0C862'
    } else if (selectPres == "F") {
        party = '#000000'
    } else if (selectPres == "null") {
        party = grey
    }

    const attachment = new Discord.Attachment(`./assets/presidents/${selectPres.name}.png`, 'president.png')

    const embed = new Discord.RichEmbed()
        .setTitle(selectPres.name)
        .setColor(party)
        .attachFile(attachment)
        .setImage('attachment://president.png')
    msg.channel.send(embed)
}