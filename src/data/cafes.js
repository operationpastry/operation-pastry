// Sample cafe data for Wellington, NZ
// Each cafe has: name, coordinates [lat, lng], website, and two pastries with reviews from Chloe and Josh

export const cafes = [
  {
    name: 'Shelley Bay Bakery',
    coordinates: [-41.29270476223692, 174.77708036280663],
    website: 'https://leedsstbakery.co.nz/',
    pastries: [
      {
        name: 'Chocolate almond croissant',
        reviews: {
          chloe: { rating: 7.9, comment: 'This was a pretty decent croissant overall, however it wasn’t anything special. The pastry was flakey and fresh, and the chocolate flavour was good, a little strong occasionally as it was quite dark. I would eat this pastry again.' },
          josh: { rating: 8.2, comment: 'I really liked the croissant! The filling was nice and the pastry itself was flaky to a good degree. However, I think that croissants have a hard cap of 8ish out of 10.' },
        },
      },
      {
        name: 'Cinnamon scroll',
        reviews: {
          chloe: { rating: 7.7, comment: 'The cinnamon scroll was slightly drier than expected. It was crispy rather than soft so didn’t quite meet my expectations of a scroll. That being said, the flavour was good and I would happily eat it again.' },
          josh: { rating: 6.8, comment: 'This was a dry scroll so I was not a huge fan of it? The flavour however was really nice.' },
        },
      },
    ],
  },
  {
    name: 'Lunch Money',
    coordinates: [-41.29362585121758, 174.77637171339953],
    website: 'https://www.lunchmoney.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 8.0, comment: 'This was a solid almond croissant. It had good flavour and a decent amount of filling, however the pastry was quite soft (to be honest I don’t know if there was really much pastry at all) which made it more cakey than flakey. It was good, though, and I would happily eat it again.' },
          josh: { rating: 8.5, comment: 'A really nice croissant! I love cake! My biggest problem with this was more of a problem in regards to identity of this pastry... pastrake? That being said I did find it to be taste-wise a really nice treat and I loved the frangipane filling. I think that this would clear 9 points if it was more easily identifiable as a croissant. That being said, as I become more open-minded in the future, I may change my mind re/ this.' },
        },
      },
      {
        name: 'Hazelnut brioche scroll',
        reviews: {
          chloe: { rating: 8.4, comment: 'This was delicious. The brioche was perfectly soft and the ratio of chocolate hazelnut filling was great. The filling was not sweet, which is a nice contrast to some of the other things we have tried. The meant it didn’t become overwhelming to eat even though it was quite large. The caramel sauce drizzle, on the other hand, was way too sweet, but you couldn’t really taste it with everything else.' },
          josh: { rating: 8.2, comment: 'This was another solid treat taste-wise. I would happily eat this again. That being said, there were some parts which I found a little bit hard? As in the scroll itself could have been softer. This may have been due to some parts of the drizzle causing a crunch which I was not really after. I am however, reaching for things to complain about here.' },
        },
      },
    ],
  },
  {
    name: 'Gemini',
    coordinates: [-41.28328847254409, 174.77670671044038],
    website: 'http://www.geminicafe.co.nz/',
    pastries: [
      {
        name: 'Almond chocolate croissant',
        reviews: {
          chloe: { rating: 8.9, comment: 'This was a wonderful croissant. The pastry was perfect and flakey. The filling was smooth and chocolatey - a lovely contrast to the pastry. There was a good ratio of pastry to filling, and it wasn’t too sweet. And it wasn’t too messy to eat either. There was also some kind of biscuity topping that added another layer of texture and flavour. I cannot fault it.' },
          josh: { rating: 9.2, comment: 'There are days I would rather have this than an Aurora fruit danish. I think most days I would go for Aurora but some days I would choose this with no hesitation. The pastry was fantastic and I loved the filling as well, it was pleasant all around. The biscuit topping was a great addition and I will definitely be going back for another some time.' },
        },
      },
      {
        name: 'Tiramisu cube croissant',
        reviews: {
          chloe: { rating: 8.1, comment: 'This cube was pretty good. It had a good coffee and chocolate flavour that wasn’t too overpowering, however the pastry was a little dense - probably due to the shape it has been forced into. In saying that, the cube shape made it fun to look at and eat, and made it an overall good experience.' },
          josh: { rating: 6.4, comment: 'I think that naming it as a croissant did more bad for me than good. I was expecting something a bit less heavy and cold and so the surprise took away from my experience a little bit. In contrast to the almond chocolate croissant, I do not see a situation in which I would choose this over an Aurora fruit danish and so I cannot really put it above a 7. I feel like the coffee cream was a bit too cold for the pastry as well. That all being said, it was nice to eat, I would eat it if it was there, but I do not see myself buying it per se.' },
        },
      },
    ],
  },
  {
    name: 'Evas Garage',
    coordinates: [-41.29228668753358, 174.77725601017974],
    website: 'http://www.evasgarage.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 7.8, comment: 'This almond croissant was what every good almond croissant should be - an almond croissant. It had a good flavour and the ratio of filling to pastry was good for the most part. The ends were quite plain and, as a result, dry. This detracted a bit from the experience but not much.' },
          josh: { rating: 7.9, comment: 'Was happy to eat this almond croissant. There was a strong almond taste which did not taste essence-y and I really appreciate it. I enjoyed the filling a lot but I found that the end of the croissant did not have much in terms of filling. Not only that, but I feel like in this case, the filling played a large-ish role in keeping the croissant from being too dry/underwhelming so the part which did not have any filling was somewhat a chore to get through. Other than that one of my favourite almond croissants!' },
        },
      },
      {
        name: 'Pain au chocolat',
        reviews: {
          chloe: { rating: 7.7, comment: 'The pastry on this was a lot flakier than the almond croissant but there was way less filling. When you got some filling it was lovely and chocolatey but otherwise it was a tad bland. Not a bad bland, just not very exciting. The texture was what saved it.' },
          josh: { rating: 7.0, comment: 'So I actually really liked every aspect of this individually. The pastry was buttery and it tasted nice. The chocolate filling was solid and was not overwhelming one way or another. It is just... there was not much chocolate filling in the first place, and I found myself missing it. I ended up eating it very "child with veges" style where I tried to get through all the non-chocolate filled parts since I wanted to save the better part for last. But from an ontological perspective, is this what eating a pastry should be about? Waiting for a better future? Self-restraint? Asceticism? No, the philosophy of pastry-eating aligns to a more hedonistic philosophy and that philosophy was somewhat broken by this pastry. It was still nice though.' },
        },
      },
    ],
  },
  {
    name: 'Le Ciel',
    coordinates: [-41.29500274840415, 174.77986307809002],
    website: 'https://lecielbakery.com/',
    pastries: [
      {
        name: 'Chocolate chip cookie croissant',
        reviews: {
          chloe: { rating: 8.9, comment: 'This was delicious. It had a nice saltiness to it, but was slightly stale when I ate it.' },
          josh: { rating: 9.1, comment: 'I do not think the actual cookie on top added that much? The texture of the croissant was flaky and crunchy but the cookie was a bit too soft to be noticed. Perhaps not having it heated up was the right idea. There was a chocolate sauce/paste inside the croissant which was really nice and added a density to the croissant which I really liked. I personally wish the croissant was a little bit less flaky but that is a personal pref thing which I did not let affect my rating' },
        },
      },
      {
        name: 'Chocolate hazelnut croissant',
        reviews: {
          chloe: { rating: 8.2, comment: 'The croissant itself was delicious. The pastry was appropriately flakey in my opinion but the hazelnut flavour mainly came from the nuts on the top - not the chocolate filling. I think that could have done with being a bit more Nullella-y.' },
          josh: { rating: 0, comment: 'Did not try' },
        },
      },
    ],
  },
  {
    name: 'Axl Coffee',
    coordinates: [-41.290831938925685, 174.77675042462155],
    website: 'https://axlcoffee.co.nz/',
    pastries: [
      {
        name: 'Nutella banana croffle',
        reviews: {
          chloe: { rating: 7.2, comment: 'The croffle itself was quite nice, more waffle than croissant, and Nutella and banana is always a good combo. The banana was probably the most dominant flavour unless you got a big dollop of choc sauce. The cream was a refreshing addition but towards the end it got a bit too much. Also the stick was a bit awkward to eat from.' },
          josh: { rating: 0, comment: 'Did not try' },
        },
      },
      {
        name: 'Tiramisu croffle',
        reviews: {
          chloe: { rating: 0, comment: 'Did not try' },
          josh: { rating: 5.4, comment: 'The croffle itself was really nice, I liked the balance between sweet and saltiness it had. However, the tiramisu cream was mildly unpleasant. I believe they tried to mimic the flavour of coffee liqueur but for me personally I found it to be overwhelming to the point I could not enjoy the croffle itself that much. I feel like in real tiramisu the sponge absorbs and neutralizes a lot of the alcohol flavour whereas here it was brought to the forefront which made it a bit of a hard eat. That being said, I really do think the croffle itself was really good.' },
        },
      },
    ],
  },
  {
    name: 'French Cancan at Moore Wilsons',
    coordinates: [-41.295379942257014, 174.78058303969704],
    website: 'https://www.frenchcancan.nz/',
    pastries: [
      {
        name: 'Pain au chocolat',
        reviews: {
          chloe: { rating: 7.3, comment: 'This was your standard bakery pain au chocolat - appropriately flakey and buttery. It was potentially a tad too flakey and it did not have enough chocolate through the middle but I would happily eat it again.' },
          josh: { rating: 7.0, comment: 'The texture of the pastry was very nice and the flavour itself was great! It was moist so it was nice as well. There was a lack of chocolate though. And overall it kind of just falls into the category of "nice".' },
        },
      },
      {
        name: 'Strawberry and rhubarb brioche',
        reviews: {
          chloe: { rating: 6.8, comment: 'I enjoyed the flavour of the strawberry and rhubarb jam, however there was not very much of it so the bites with no jam were quite dry. The bites with jam were actually quite nice. The bread itself tasted really good, but yet again it was a tad dry.' },
          josh: { rating: 6.2, comment: 'A good brioche which was a little bit dry. Could have benefited by having more filling (Maybe having the filling hole being vertical instead of horizontal?) The filling itself was nice, but there was not really enough to enjoy it fully. Flavour of the brioche was strong but the dryness did detract from the experience.' },
        },
      },
    ],
  },
  {
    name: 'Myrtle',
    coordinates: [-41.295080424174394, 174.78357616853296],
    website: 'http://myrtle.co.nz/',
    pastries: [
      {
        name: 'Chocolate hazelnut croissant',
        reviews: {
          chloe: { rating: 8.5, comment: 'This was a very good croissant. The pastry was nice and flakey but not too dry. The filling had good flavour and texturally contrasted the pastry with both softer and harder textures. The hazelnut flavour was a little overpowering at points but generally was pretty good. The chocolate on the top was also a nice touch.' },
          josh: { rating: 8.1, comment: 'A really strong croissant. I thought it was good texture and flavour wise and I would be happy to get it again. There were some parts of possibly just really dark chocolate which almost tasted burnt to me but it definitely was not a heavy detractor in any aspect. Loved the hazelnut filling.' },
        },
      },
      {
        name: 'Apple, lemon and brown butter cinnamon roll',
        reviews: {
          chloe: { rating: 8.0, comment: 'This was quite nice. The lemon icing on the top (and syrup in it?) was quite strong which gave the whole thing quite a tangy flavour. The fruity element reminded me more of a hot cross bun than a cinnamon roll but that is not a bad thing. The bread itself was soft and fluffy and not stodgy (which some cinnamon rolls can be) so was overall a pleasant experience.' },
          josh: { rating: 7.0, comment: 'I respect that it is unapologetically a lemon pastry. I think that its balance with apple and cinnamon could have been a little better though. By the end of my half of the roll I found myself getting a bit overwhelmed and so I do not think I would have necessarily enjoyed the full roll experience as much as I enjoyed my half. That being said, the bread was very nice and it was a good experience to eat it, I just think weakening the lemon may have elevated it.' },
        },
      },
    ],
  },
  {
    name: 'La Cloche',
    coordinates: [-41.28178964804908, 174.77799273145243],
    website: 'http://www.lacloche.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 7.4, comment: 'This wasn’t much of a croissant - the texture was more like a cake than anything, apart from the crispy ends that were somewhat flakey. This did mean it was nice and moist though. The flavour, however, was delicious and I would happily eat it again. It reminded me of an almond sugar cookie, which is not a bad thing, it just wasn’t really croissanty.' },
          josh: { rating: 4.9, comment: 'This was not a croissant - this was a cake. It did taste nice and the ends were crispy. For an almond cake, I feel like it was quite nice and I would give it upwards of an 8/10. But as it is not a croissant I do not feel comfortable giving it more than average since as a croissant it fundamentally fails.' },
        },
      },
      {
        name: 'Passionfruit opera cake',
        reviews: {
          chloe: { rating: 7.7, comment: 'This was very nice. The first bite I took didn’t have much flavour but as I got further into it the flavour of the passionfruit cream got stronger and was fresh and smooth. The jelly topping was a little tough but overall I quite enjoyed it.' },
          josh: { rating: 7.4, comment: 'I quite liked this flavour-wise, this may be an unfair judgement but I wish it was slightly more chilled. It was nice, it felt smooth, there was a good amount of tanginess, however, I did not love the jelly topping texture wise as it did break the smooth experience in an almost disruptive way for me. Perhaps a slightly more moist experience would have elevated it.' },
        },
      },
    ],
  },
  {
    name: 'Bordeaux Bakery',
    coordinates: [-41.281831273419016, 174.77765920678496],
    website: 'https://bordeauxbakery.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 8.4, comment: 'This was a simple croissant done well. The pastry was flakey and fresh, and there was just enough filling to flavour the croissant without being overpowering. It was not too sweet, which was quite a nice contrast to some of the other pastries we have tried, making it a croissant I could eat a lot of.' },
          josh: { rating: 8.9, comment: 'Best croissant I feel like I have had to to date. Flakiness was just right for me personally and the filling was great. Easy and light and nothing really that I disliked about it. I do not know if for me croissants can get above a 9/10 but this made me think that maybe it is possible. A real eye-opener.' },
        },
      },
      {
        name: 'Raspberry danish',
        reviews: {
          chloe: { rating: 8.0, comment: 'This danish was delicious and tangy. The raspberries were fresh and a great reminder of summer, but the flavour was quite strong so could be too much if you are not in the mood. It was slightly chilled, which meant the pastry was a little dense but not enough to ruin the experience. ' },
          josh: { rating: 7.0, comment: 'I am always in the mood for a slightly chilled dessert. However, I do not know how much satisfaction I personally can get out of this particular food? I think I personally am a fan of slightly more "rich" foods? I think this one is just a case of taste mismatch for me personally, but I do think it was made well. I probably would have liked it better without the raspberries as they cut the sweetness a bit for me (I enjoyed the sweetness).' },
        },
      },
    ],
  },
  {
    name: 'New World Chaffers',
    coordinates: [-41.29243689258932, 174.7843432513464],
    website: 'http://www.newworld.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 7.6, comment: 'This croissant is a tough one to judge. It had a really nice croissant flavour, but the texture was quite dry. In saying that, the dryness wasn’t unpleasant - it was almost like it had been toasted and had a kind of bread-crusty flavour. While this wouldn’t be my first choice of all the croissants we tested, I would happily eat it if presented with it.' },
          josh: { rating: 7.2, comment: 'This guy was weirdly hard for a croissant. Some may even say unpleasantly so. However, I need a hear me out moment from the reader of this review. It was kind of nice to have a chewy and crunch croissant. It was a pleasant eating experience for me and I enjoyed it like it was a crusty baguette. The flavour was better than some bakeries croissants as well! That being said, I do think that there is a hard limit to how good this croissant can be as the flavour is nice, not necessarily great and also the crustiness does lose its value as a gimmick after a while.' },
        },
      },
      {
        name: 'Cronut',
        reviews: {
          chloe: { rating: 6.9, comment: 'While the this was tasty, it was quite sickly. The dough/pastry was soft and fresh and had a great cinnamon sugar flavour, but there was too much custard that made it difficult to finish. I only had half of one and it was too much so I definitely couldn’t eat a whole one.' },
          josh: { rating: 5.8, comment: 'I found it kind of overwhelming. I was disappointed with what I expected to be a New World delicacy. Unfortunately, I feel like the word mid is appropriate here. It was very one note sweet and this just continued throughout the whole experience, an experience that would have been too long even if the pastry was nicer. This was not disgusting. it was nice, I just would not want to have too much of this in one go. I think I would enjoy this if I did not have the money to buy things I actually like?' },
        },
      },
    ],
  },
  {
    name: 'Black Lion Bakery',
    coordinates: [-41.29407690196206, 174.77503584366994],
    website: 'https://blacklionbakery.co.nz/',
    pastries: [
      {
        name: 'Apple cinnamon danish',
        reviews: {
          chloe: { rating: 7.6, comment: 'This pastry didn’t blow my socks off but it had a good flavour and texture. It was quite a cosy danish, and being heated up a little helped with that. The custard was good and provided a contrast to the pastry, but overall I think it was just average.' },
          josh: { rating: 6.8, comment: 'This pastry was nice! It was comfy and it was also kind of just ave. That being said, it was a positive average so it is going in the 6s but also I cannot really seeing myself going on a 15 minute walk to buy this again? The custard was the highlight for me as it added interest to the pastry and cut through the kind of one-note flavours, but I do not think that in itself could carry it.' },
        },
      },
      {
        name: 'Boysenberry danish',
        reviews: {
          chloe: { rating: 7.3, comment: 'Like the other one we tried from here, this was an average pastry with a good strong boysenberry flavour. It could be a little too much if you aren’t prepared for the tanginess but I would eat it again. It loses points, however, for leaking through the bag and staining my pants.' },
          josh: { rating: 5.8, comment: 'On a scale of 1-10 I think that 5.5 is the exact middle? This is slightly above that in that it had more positives than negatives for me. That being said I was taken aback a bit by how sharp it was, I do not think that level of tanginess is what I look/prepare for when getting a pastry of all things? I probably would not eat it again but I am glad to have tried it.' },
        },
      },
    ],
  },
  {
    name: 'Volco (The Terrace)',
    coordinates: [-41.27906601598891, 174.77571394154816],
    website: 'https://www.instagram.com/volcodoughclub/?hl=en',
    pastries: [
      {
        name: 'Pain au chocolat',
        reviews: {
          chloe: { rating: 8.4, comment: 'This was a classic done well. The pastry was appropriately flakey and the filling was a chocolate paste, which meant I got flavour with every bite. There isn’t really much to say - it was a great pastry and I would happily choose it over something with lots for frills and flavour.' },
          josh: { rating: 8.0, comment: 'A great pain au chocolat! I cannot really think of much that I am unhappy about it. I think that if the pastry was saltier? Or had something like rock salt incorporated into it that it would have made a really nice contrast between sweet and salty as the sweetness was a very predominant flavour here. That being said, being just sweet is not a terrible thing and as far as normal pain-au-chocolats go, this was fantastic.' },
        },
      },
      {
        name: 'Lemon meringue danish',
        reviews: {
          chloe: { rating: 8.0, comment: 'This danish had a lot of flavour. The lemon was tangy. The meringue was marshmallowy and slightly caramely. And the custard gave it a fresh base. All this flavour did mean it got a bit much towards the end, but overall it was really nice.' },
          josh: { rating: 7.0, comment: 'This pastry was really nice, my biggest gripe with it is that after a bit it became a bit too sweet for me. I really liked the custard (?) that was underneath the lemon bit though and it really did help balance things out in my opinion. I got a bit of meringue on my nose which was funny but I did notice that it had a bit of a stickier texture than I would personally prefer. Overall was a good eating experience though!' },
        },
      },
    ],
  },
  {
    name: 'French Kiss Cafe',
    coordinates: [-41.2846869436954, 174.77750609922032],
    website: 'https://www.facebook.com/p/French-kiss-cafe-100063692420186/',
    pastries: [
      {
        name: 'Pear danish',
        reviews: {
          chloe: { rating: 6.7, comment: 'I was slightly disappointed by this danish. Visually it looked promising but the pastry was quite dense, and looked a little raw in the middle. The pear had a nice fresh flavour and good texture contrast, however I expected more from it.' },
          josh: { rating: 6.2, comment: 'As Gordon Ramsey once said "It\'s raw." I feel like in a universe where this was in the oven longer + was also fresh out of said oven, this would have been a fantastic pastry. The flavour of the pastry and pear was great, but it was brought down by the fact that there were patches of uncooked pastry. ' },
        },
      },
      {
        name: 'Plum swirl',
        reviews: {
          chloe: { rating: 7.6, comment: 'This was a solid pastry. The plum was strong and the custard had a nice vanilla flavour. The custard was a little gelatinous but overall all the elements of the pastry had good texture and flavour contrast. The pastry was flakier than the pear danish, which gives it a higher rating. And it had a good swirl pattern on the bottom - no misleading advertising here.' },
          josh: { rating: 7.0, comment: 'Good Pastry. I would have it again if it were readily available. The swirl itself was lovely. This was also probably underbaked a little bit, that being said, it worked well with this pastry and so I did not treat it as a hard negative here. My favourite (only) swirl we have had so far, but it has made me look forward to the idea of having a swirl again in the future.' },
        },
      },
    ],
  },
  {
    name: 'Glou Glou',
    coordinates: [-41.29284139425195, 174.78262566853292],
    website: 'http://glouglou.nz/',
    pastries: [
      {
        name: 'Banoffee crumpet',
        reviews: {
          chloe: { rating: 6.1, comment: 'This had a decent banoffee flavour and the cream added a nice freshness. The crumpet itself was a little plain but acted as a good base to the topping. I was not blown away by this and it didn’t really live up to the hype I had heard.' },
          josh: { rating: 5.3, comment: 'I am going to be honest with you, I do not think it would be a huge downgrade if it was just whipped cream on a crumpet. The banoffee flavour was nice enough but it did not really change the game for me in any meaningful manner. The crumpet was okay and that is all I can really say about it. Will not be buying again.' },
        },
      },
      {
        name: 'Oreo almond butter crumpet',
        reviews: {
          chloe: { rating: 6.0, comment: 'To be honest, this was a bit disappointing. The crumpet was not sweet and mostly just tasted like almond butter. The crumpet itself was ok, but there was not a lot of flavour and the Oreo added nothing. Don’t think I’ll get this again.' },
          josh: { rating: 4.1, comment: 'I would categorize eating this as an overall unpleasant experience. It manages to have all the notes of almond flavouring that I personally do not like, mixed with a crumby texture which does not do it any favours. If I were to close my eyes I do not think I would have been able to identify it as an Oreo flavoured thing in the first place. It felt kind of just like munching on a very plainly flavoured flatbread almost with a weird textural topping.' },
        },
      },
    ],
  },
  {
    name: 'Belen',
    coordinates: [-41.2925885641487, 174.77897633996596],
    website: 'https://www.belenplantbakery.com/',
    pastries: [
      {
        name: 'Ham and cheese croissant',
        reviews: {
          chloe: { rating: 7.7, comment: 'When we first got this croissant, we were confused by the filling so we heated it up to see if it would melt nicely. What we forgot was that Belen is a vegan bakery so it was not real cheese nor real ham. Despite this, it actually tasted like the real thing. The ‘ham’ was more of a paste which was odd but it tasted meaty/salty and the ‘cheese’ was cheesy. The pastry was good and quite nice heated up. We haven’t reviewed a savoury item yet but I would eat this again.' },
          josh: { rating: 8.2, comment: 'I enjoyed this a lot more than I thought we would! The thing that hurt this the most for me was not the taste, but actually just seeing the "meat paste" itself as it did put me off a little bit. I also did miss the "melted cheese" experience, but other than that it was quite nice! I would be open for more savoury options in the future.' },
        },
      },
      {
        name: 'Churro cruffin',
        reviews: {
          chloe: { rating: 7.8, comment: 'This was very yummy. It had lots of chocolate in the middle and the pastry was nice, not flakey but I guess that’s the muffin aspect that prevents that. The chocolate may have been a bit strong at times as it was dark, but I would definitely eat this again.' },
          josh: { rating: 7.5, comment: 'I was a fan of this. I liked it and it tasted nice, it was not what I would look for in a croissant or a muffin so I guess it does have its niche. The dark chocolate was a little bit overpowering and I did kind of miss the "cinnamony" aspect that churros tend to have. That being said, it was still really nice!' },
        },
      },
    ],
  },
  {
    name: 'Sixes and Sevens',
    coordinates: [-41.292891938619995, 174.77879149016925],
    website: 'http://www.sixes.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 7.5, comment: 'This was a decent croissant taste wise. The frangipane filling had good flavour and wasn’t too strong. The pastry, however, was flat and minimal. It was also quite dry/crispy which meant it didn’t have the flakey texture a pastry should have. It was a bit underwhelming but alright nonetheless.' },
          josh: { rating: 7.7, comment: 'The taste was great imo. I really enjoyed the filling and I feel like the croissant itself tasted nice - that being said texturally this croissant was waaay too hard for me and the crunching sensation was unpleasant.' },
        },
      },
      {
        name: 'Wellington cube croissant',
        reviews: {
          chloe: { rating: 6.3, comment: 'This was way too sickly. The flavour of the pastry was unclear in the shop so cutting it open to find a lava flow of salted caramel filling was a shock. The first bite was tasty, but after that it became too much and was difficult to finish. The pastry was also dry/tight so didn’t contribute much.' },
          josh: { rating: 4.8, comment: 'I would rather not eat this again to be honest. I feel like the salted-caramel was well made but there was an overwhelming amount of it. Also the caramel made it hard to hold and unpleasant to touch. If there was a lot less caramel this could have gone far.' },
        },
      },
    ],
  },
  {
    name: 'Zephyr Cafe',
    coordinates: [-41.29137647885741, 174.7809722697264],
    website: 'https://www.zephyrcafe.co.nz/menu',
    pastries: [
      {
        name: 'Chocolate hazelnut croissant',
        reviews: {
          chloe: { rating: 7.9, comment: 'This one was a little hard to judge as it was warmed up, meaning the pastry wasn’t as flakey as it could be. Based on what it was like, though, the crispier edges suggested that it was a good dough, and it was pleasant to eat. The filling was quite buttery, which could have been slightly temperature related, but it was yummy. There was only a little bit of Nutella on top for the hazelnut element so I feel like it could have had more of this.' },
          josh: { rating: 8.4, comment: 'I think that getting the croissant heated was probably a mistake - if not just for the fact that it caused the flakiness of the pastry to become unjudgeable - that being said, the flavour was up my alley personally so I enjoyed it a lot. I enjoyed the slightly more rich filling and the only thing I wanted out of it more was a sliiiiightly stronger nutella flavouring.' },
        },
      },
      {
        name: 'Caramello brownie',
        reviews: {
          chloe: { rating: 7.6, comment: 'While this is not a pastry it feels rude not to review it. It was a good brownie - rich and chocolatey. The top was hard and the centre soft which created a nice textural experience, and the caramel swirl was yum, if not a tad on the sweet side. Would eat again.' },
          josh: { rating: 7.0, comment: 'Honestly it was nice. But that is about where my review ends, I found it comparable to the brownies that we got at one point for boost days. Nothing super special but it was pleasant none the less.' },
        },
      },
    ],
  },
  {
    name: 'Dough Bakery',
    coordinates: [-41.28975254555496, 174.77618835530907],
    website: 'http://www.doughbakery.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 7.6, comment: 'This was a solid almond croissant, however the filling had a slight fruity tang to it which was a little odd. It still tasted good though and it created enough contrast to the slightly dry pastry that made it a nice mouthful texture-wise.' },
          josh: { rating: 6.4, comment: 'I’m very sure that I’m supposed to like this a lot, my big problem here however is that the vaguely marmalade-y taste to this almost came across as fishy to me? This made it kind of an unpleasant eat for me, but also if I didn’t think about it I enjoyed it. It was purely just a mental thing but I don’t like that I had to mentally engage while eating this. ' },
        },
      },
      {
        name: 'Pain au chocolat',
        reviews: {
          chloe: { rating: 7.9, comment: 'This pastry had both sticks of chocolate AND a swirl through it, meaning the chocolate was well distributed and never too overpowering. The pastry felt a little dry in places but as there was chocolate in every bite it didn’t really matter. The brown stripes on the top felt a bit unnecessary as they just fell off, but it looked cool in the cabinet.' },
          josh: { rating: 8.4, comment: 'I really enjoyed this! Taste-wise it was very good and it didn’t fall into the common pain au chocolat trap of having some non-chocolate bites. That being said there were some chocolate strips on top which I can only guess was for purely aesthetic reasons as they didn’t really do anything except be a nuisance. Less can be more.' },
        },
      },
    ],
  },
  {
    name: 'Jimmy J Takeaway Coffee',
    coordinates: [-41.29115062808461, 174.7793340255332],
    website: 'https://jimmyj.bitebusiness.com/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 8.0, comment: 'This was a good, solid croissant. The almond paste had a good flavour and the pastry was airy and soft. It could have been a little flakier but overall I would happily buy another one of these. There is not much more to say really.' },
          josh: { rating: 8.0, comment: 'Loved the paste, it was nice. My biggest complaint with this is that there was an inconsistent texture throughout - some bits were very airy and some bits felt a bit dense to me. I would have appreciated a more even flakiness level.' },
        },
      },
      {
        name: 'Pain au chocolat',
        reviews: {
          chloe: { rating: 7.8, comment: 'Similar to the almond croissant, the pastry was soft and REALLY airy but could have done with a bit more flake. The chocolate flavour was strong as it was dark chocolate which made it a little overpowering at times.' },
          josh: { rating: 8.0, comment: 'I have a similar complaint to above. There were parts which were filled with dark chocolate and I absolutely loved it. There were also parts which were practically empty. There were 10 out of 10 moments and 6/10 moments. I am therefore giving this an 8' },
        },
      },
    ],
  },
  {
    name: 'Bellagio Cafe',
    coordinates: [-41.28241326201884, 174.77721358043942],
    website: 'https://www.instagram.com/bellagiocafe_welly/?hl=en',
    pastries: [
      {
        name: 'Almond pain au chocolat',
        reviews: {
          chloe: { rating: 5.0, comment: 'This was just dry. It had a very subtle almond chocolate flavour but there was not enough of it. It also seemed like it had been in the cabinet a few days. I would not get this again.' },
          josh: { rating: 3.4, comment: 'When I was 6 years old I tried making my parents a self-saucing pudding. I gave a bowl with ice cream to each of my parents and went to an adjacent room to play video games. Queue my disappointment when I overheard my father telling my mother that they should return the pudding to me because it was simultaneously too dry and too rubbery. My mother said that they should not do that since I tried hard but my father insisted that it would help me a better cook in the future. In the end, he returned the puddings, asked me about what instructions i followed and then gave me instructions on what I should have changed to help the texture out. The next time I tried making self-saucing puddings it was a hit. This pan au chocolat is what happens when your father does not return your dry rubbery food and you just coast through life. The flavour is fine (I think?) but fully overshadowed by just how dry and probably aged? this is.' },
        },
      },
      {
        name: 'Passionfruit and peach danish',
        reviews: {
          chloe: { rating: 5.3, comment: 'This pastry was a Trojan horse. On top it looked like it was going to be amazing but once we could see the charcoal black underside my expectations quickly plummeted. It tasted burnt. That was the main flavour. Once I peeled off the burnt layer from the bottom it wasn’t as bad and I got used to the flavour, but it still ruined the overall experience. The pastry was also quite bready, but the passionfruit peach filling was nice and tangy.' },
          josh: { rating: 2.7, comment: 'To quote a very popular chef - "it\'s burnt." I think that the fruit compote on top was probably nice but unfortunately I was distracted by the taste of burnt pastry. The texture was bad too but it was hard to notice much about it when all I could think about was burning.' },
        },
      },
    ],
  },
  {
    name: 'Chou Chou',
    coordinates: [-41.290112920503304, 174.78049841086087],
    website: 'http://www.chouchou.co.nz/',
    pastries: [
      {
        name: 'Chocolate croissant',
        reviews: {
          chloe: { rating: 8.8, comment: 'This was a gooood croissant. It had a great chocolatey flavour with a lot of moussy cream in the middle. There were solid bits of chocolate at the end which gave a nice contrasting texture and flavour. If I had to critique anything, there was maybe a tad too much filling, as it did get a little sickly near the end and it made the pastry a bit soft. The chocolate chips on the top were a cherry on top too. I would 100% eat this again. ' },
          josh: { rating: 6.2, comment: 'I really enjoyed the filling and the chocolate chips added an aspect of texture which I think elevated the experience with it. My complaints with it are that a). I feel like there was too much filling for me personally with it getting kind of sickly near the end and b). the croissant itself was a little bit average, I think the filling carried this croissant pretty hard.' },
        },
      },
      {
        name: 'Pistachio croissant',
        reviews: {
          chloe: { rating: 9.0, comment: 'While I am often a chocolate fiend, I think I actually preferred the pistachio croissant over the chocolate one. It wasn’t too sweet which meant I could eat it all without any issue. The nut flavour was subtle and there was a better filling to pastry ratio meaning I could actually taste and feel the different textures. The inside was also kind of neon green which was very brat, radioactive and fun. This might be a bold statement, but this could potentially be my favourite pastry we’ve had.' },
          josh: { rating: 7.0, comment: 'So I think that this does just overtake the chocolate croissant in nearly every aspect. I think the filling is a lot more subtle which balances the fact out that there is a lot of it. I still maintain my position on the pastry itself being average. That all being said though, I have a feeling that this score is slightly lowered because the former chocolate croissant half was already a lot of sweetness and so I probably felt less forgiving to sweetness while eating this one.' },
        },
      },
    ],
  },
  {
    name: 'Volco (Egmont Street)',
    coordinates: [-41.29248294631712, 174.77789060135703],
    website: 'https://www.instagram.com/volcodoughclub/?hl=en',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 8.0, comment: 'This was pretty decent almond croissant. It was very tall and was almost quite cakey, which I didn’t mind but the pastry could have been flakier. The almond flavour was good and it was pleasant eat so I would get it again.' },
          josh: { rating: 8.7, comment: 'This was one of those pastries which I personally really loved flavour-wise, but I feel like its identity as an almond croissant is slightly misplaced. There were points where it was almost cake-like and whilst it was a delicious cake that I loved every bite of, it did not feel croissant enough for me.' },
        },
      },
      {
        name: 'Crookie',
        reviews: {
          chloe: { rating: 7.6, comment: 'This was an interesting one. Cutting it open to find a whole Oreo inside was a cool surprise and gave it big points for intrigue. The pastry itself was good and the cream was quite a refreshing contrast (although it didn’t have any flavouring). The cookie part was good but was quite sweet and a bit cookie-dough fudgey. It was also a fun shape which gives it extra bonus Jonas points.' },
          josh: { rating: 7.0, comment: 'The concept is cool and I hope that they continue to do things like this as it truly is the spice of life. That being said, I did find it sickly sweet at some point and whilst I was able to happily eat half of one, I cannot really imagine myself wanting an entire one unless I had something to explicitly offset its flavour.' },
        },
      },
    ],
  },
  {
    name: 'Good Grief',
    coordinates: [-41.295414117121716, 174.77309176244805],
    website: 'https://goodgriefbaking.co.nz/',
    pastries: [
      {
        name: 'Almond croissant',
        reviews: {
          chloe: { rating: 7.8, comment: 'This was a good almond croissant. It had a nice thick filling and the pastry was decent. I have to admit, though, it did not knock my socks off. It did not feel fresh, so maybe if we had purchased it earlier in the day it would have been better. It has a lot of potential though, and I would definitely eat it again.' },
          josh: { rating: 8.0, comment: 'A solid croissant. I enjoyed the filling a good amount and I liked the pastry itself as well. Here is the main conundrum I had while rating this though - I feel like if this was freshly out of the oven there is a good chance it would go up a whole point in rating. But as it stands, I felt like there was almost a dampness to it which probably came with sitting around a little bit and more importantly being somewhat rained on. A victim of circumstance but alas.' },
        },
      },
      {
        name: 'Pain au chocolat',
        reviews: {
          chloe: { rating: 7.9, comment: 'Another solid pain au chocolat. It had a whole square of what I think was the Whittakers Marlborough Sea Salt Caramel chocolate in the middle which elevated the flavour somewhat, and the pastry had very clear and separated layers in a way that I have not yet seen in this operation. The ability to peel the layers off was very satisfying. Again, I do not think it was fresh so it was not perfect but it was enjoyable.' },
          josh: { rating: 8.3, comment: 'I really liked the layers for this pain au chocolat. To me it made the eating experience more pleasant and I liked the choice of chocolate used. That being said, I cannot place my finger on why, but the chocolate itself felt a little bit sad to me. I do not have a good reason for this, but I feel like a block of Whittakers chocolate has seen better days. I would almost go as far as pushing to get a thicker chocolate in there. That being said, this is definitely a nitpick. This also suffers from feeling slightly damp to me which I think may be because of the environment that it had to get through. Overall good experience though.' },
        },
      },
    ],
  },
  {
    name: 'Aurora',
    coordinates: [-41.29021892592613, 174.77544429100362],
    website: 'http://argentinianbakery.co.nz/',
    pastries: [
      {
        name: 'Almond swirl',
        reviews: {
          chloe: { rating: 8.0, comment: 'I felt like this pastry had an almost custardy flavour. The centre of it was quite doughy but it gave the vibe of a bread pudding rather than being undercooked. So flavour wise it was pleasant, but I would have liked it to be a bit flakier. In saying that, I do prefer this texture to a dry pastry.' },
          josh: { rating: 8.4, comment: 'There is something about Auroras dough which I just adore - there is a nice doughiness and moisture to it which I think got me onto pastries in the first place. That being said I have already forgotten how this tasted which to me means that I liked the dough a lot but found the almond aspect itself to be meh I guess.' },
        },
      },
      {
        name: 'Medialuna',
        reviews: {
          chloe: { rating: 8.0, comment: 'This felt quite similar flavour-wise but the texture of the filling added a light contrast to the pastry. I feel like I might have needed to eat a whole one to get the full impact of the medialuna, but it had a very delicate flavour and was slightly less dense than the almond swirl.' },
          josh: { rating: 8.1, comment: 'Similarly I really liked the dough here as well. The filling did taste nice but I feel like what would really push this over the edge is a fruit aspect - peach for example? Overall though a great eating experience if not a little bit heavy.' },
        },
      },
    ],
  },
]

export default cafes


