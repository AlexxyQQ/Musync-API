from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

song_titles = [
    "A-Punk - Vampire Weekend",
    "Adventure of a Lifetime - Coldplay",
    "As It Was - Harry Styles",
    "Black Madonna - Cage The Elephant",
    "Borderline - Tame Impala",
    "Breathe Deeper - Tame Impala",
    "Build Me Up Buttercup - The Foundations",
    "Cigarette Daydreams - Cage The Elephant",
    "Dark Red - Steve Lacy",
    "Hot Rod - Dayglow",
    "Hymn for the Weekend - Coldplay",
    "I Feel It Coming - The Weeknd",
    "Instant Crush - Daft Punk",
    "Island In The Sun (Album Version) - Weezer",
    "Kids - MGMT",
    "Mr. Brightside - The Killers",
    "Out of My League - Fitz and The Tantrums",
    "Pumped Up Kicks - Foster the People",
    "Run the World!!! - Dayglow",
    "Shy Away - Twenty One Pilots",
    "Smells Like Summer - Early Hours",
    "still feel. - half·alive",
    "Sunflower - Rex Orange County",
    "Sweater Weather - The Neighbourhood",
    "Tear in My Heart - Twenty One Pilots",
    "THATS WHAT I WANT - Lil Nas X",
    "The Less I Know The Better - Tame Impala",
    "This Life - Vampire Weekend",
    "Time to Pretend - MGMT",
    "Watermelon Sugar - Harry Styles",
    "Where Did Your Love Go_ - Dawid Podsiadlo",
]

lyrics = [
    """Johanna drove slowly into the city
The Hudson river all filled with snow
She spied the ring on His Honor's finger
Oh, oh, oh

A thousand years in one piece of silver
She took it from his lily white hand
Showed no fear, she'd seen the thing
In the young men's wing at Sloan-Kettering

Look outside at the raincoats coming, say, "Oh"
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Turn your magic on
Umi, she'd say
Everything you want's a dream away
And we are legends every day
That's what she told him

Turn your magic on
To me, she'd say
Everything you want's a dream away
Under this pressure, under this weight
We are diamonds

Now I feel my heart beating
I feel my heart underneath my skin
And I feel my heart beating
Oh, you make me feel
Like I'm alive again

Alive again!
Oh, you make me feel
Like I'm alive again

Said, I can't go on
Not in this way
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Come on, Harry, we wanna say "good night" to you!

Holding me back
Gravity's holding me back
I want you to hold out the palm of your hand
Why don't we leave it at that?

Nothing to say
When everything gets in the way
Seems you cannot be replaced
And I'm the one who will stay
Oh-oh-oh

In this world
It's just us
You know it's not the same as it was

In this world
It's just us
You know it's not the same as it was
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Soft glow on the city
She said, "There's no one here who can touch you now"
Caught the last flight out of LAX
With your one-way ticket, New York-bound

Climb so high, don't make a sound
Don't you forget what goes up must come down
Climb so high, tell me how it feels

Call me when you're ready to be real
Black Madonna, hallelujah
Makes no difference here, so let's be real
Black Madonna, my black flower
Nowhere left to run, nowhere left to hide
You're not havin' fun, I think that you should ride
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Gone a little far
Gone a little far this time with something
How was I to know
How was I to know this high came rushing

We're on the borderline
Dangerously fine and unforgiving
Possibly a sign
I'm gonna have the strangest night on Sunday

Here I go
Quite a show for a loner in LA
I wonder how I managed to end up in this place
Where I couldn't get away

We're on the borderline
Caught between the tides of pain and rapture

Then I saw the time
Watched it speedin' by like a train
Like a train

Will I be known and loved?
Is there one that I trust?
Starting to sober up
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """If you think I couldn't hold my own believe me
I can
Believe me
I can
Believe me
I can

If it aint so awful and we're all together
I can
Believe me
I can
Believe me
I can

If you think I couldn't roll with you believe me
I can
Believe me
I can
Believe me
I can

If ideally we should feel like this forever
I can
Believe me
I can
Believe me
I can

(And she said) Seems you're coming on
Breathe a little deeper should you need to come undone
And let those colours run
Would you say, now you're havin' fun?
So do this and get through this and come find me when you're done
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Why do you build me up? (Build me up)
Buttercup baby, just to let me down (let me down)
And mess me around and then worst of all (worst of all)
You never call baby when you say you will (say you will)
But I love you still, I need you (I need you)
More than anyone, darlin'
You know that I have from the start
So build me up (build me up)
Buttercup, don't break my heart

"I'll be over at ten", you told me time and again
But you're late, I waited around and then (bah-dah-dah)
I run to the door, I can't take any more
It's not you, you let me down again (hey, hey, hey!)

Baby, baby, try to find (hey, hey, hey!)
A little time and I'll make you happy (hey, hey, hey!)
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Did you stand there all alone?
Oh, I cannot explain what's going down
I can see you standing next to me
In and out somewhere else right now

You sigh, look away
I can see it clear as day
Close your eyes, so afraid
Hide behind that baby face

Do-do-do, do-do-do

You can drive all night
Looking for the answers in the pouring rain
You wanna find peace of mind
Looking for the answer

...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Something bad is 'bout to happen to me
I don't know it, but I feel it coming
Might be so sad, might leave my nose running
I just hope she don't wanna leave me

Don't you give me up, please don't give up
Honey, I belong with you, and only you, baby
Only you, my girl, only you, babe (you)
Only you, darling, only you, babe (you)
Only you, my girl, only you, babe (you)
Only you, darling, only you

Something bad is 'bout to happen to me
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """My memory is not like the other one
Turn to strike my face
Always second place
Tell me again why is it I
Never can do anything right?
Complicated theories of life, sarcastically

But we both know-oh-oh
The way it's gonna go-oh-oh in the same way
Maybe I'm not all not that you thought
And we don't mo-o-ove
Like we used to do-o-o in the same way
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """And said drink from me, drink from me (oh-ah-oh-ah)
That we shoot across the sky (symphony, pour on a...)
That we shoot across the sky
Drink from me, drink from me (oh-ah-oh-ah)
That we shoot across the sky (symphony, so high, so high)
That we shoot across the sky

Oh, angel sent from up above
You know you make my world light up
When I was down, when I was hurt
You came to lift me up
Life is a drink and love's a drug
Oh, now I think I must be miles up
When I was a river dried up
You came to rain a flood

You said drink from me, drink from me
When I was so thirsty
Poured on a symphony
Now I just can't get enough
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Tell me what you really like
Baby I can take my time
We don't ever have to fight
Just take it step-by-step
I can see it in your eyes
'Cause they never tell me lies
I can feel that body shake
And the heat between your legs

You've been scared of love and what it did to you
You don't have to run, I know what you've been through
Just a simple touch and it can set you free
We don't have to rush when you're alone with me

I feel it coming, I feel it coming, babe
I feel it coming, I feel it coming, babe
I feel it coming, I feel it coming, babe
I feel it coming, I feel it coming, babe

You are not the single type
So baby, this the perfect time
I'm just trying to get you high
And faded off this touch
You don't need a lonely night
So baby, I can make it right
You just got to let me try
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """I didn't want to be the one to forget
I thought of everything I'd never regret
A little time with you is all that I get
That's all we need because it's all we can take

One thing I never see the same when your 'round
I don't believe in him, his lips on the ground
I wanna take you to that place in the "Roche"
But no one gives us any time anymore

He asked me once if I'd look in on his dog
You made an offer for it, then you ran off
I got this picture of us, gets in my head
And all I hear is the last thing that you said

"I listened to your problems
Now listen to mine"
I didn't want to anymore, oh oh oh

And we will never be alone again
'Cause it doesn't happen every day
Kinda counted on you being a friend
Can I give it up or give it away?

Now I thought about what I wanna say
But I never really know where to go
So I chained myself to a friend
'Cause I know it unlocks like a door

And we will never be alone again
'Cause it doesn't happen every day
Kinda counted on you being a friend
Can I give it up or give it away?
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Hip-hip
Hip-hip
Hip-hip
Hip-hip

When you're on a holiday
You can't find the words to say
All the things that come to you
And I wanna feel it too

On an island in the sun
We'll be playing and having fun
And it makes me feel so fine
I can't control my brain

Hip-hip
Hip-hip

...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """You were a child, crawling on your knees toward it
Making momma so proud
But your voice is too loud

We like to watch you laughing
You pick the insects off plants
No time to think of consequences

Control yourself
Take only what you need from it
A family of trees wanting
To be haunted

Control yourself
Take only what you need from it
A family of trees wanting
To be haunted

...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """I'm coming out of my cage and I've been doing just fine
Gotta, gotta be down because I want it all
It started out with a kiss, how did it end up like this?
It was only a kiss, it was only a kiss

Now I'm falling asleep and she's calling a cab
While he's having a smoke and she's taking a drag
Now they're going to bed and my stomach is sick
And it's all in my head, but she's touching his

Chest now, he takes off her dress now
Let me go

I just can't look, it's killing me
And taking control
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """More than just a dream
More than just a dream

40 days and 40 nights
I waited for a girl like you to come and save my life
All the days I waited for you
You know the ones who said I'd never find someone like you

'Cause you were out of my league
All the things I believed
You were just the right kind
Yeah, you were more than just a dream
You were out of my league
Got my heartbeat racing
If I die, don't wake me
'Cause you are more than just a dream

From time to time I pinch myself
Because I think my girl mistakes me for somebody else
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """I didn't want to be the one to forget
I thought of everything I'd never regret
A little time with you is all that I get
That's all we need because it's all we can take

One thing I never see the same when your 'round
I don't believe in him, his lips on the ground
I wanna take you to that place in the "Roche"
But no one gives us any time anymore

He asked me once if I'd look in on his dog
You made an offer for it, then you ran off
I got this picture of us, gets in my head
And all I hear is the last thing that you said

"I listened to your problems
Now listen to mine"
I didn't want to anymore, oh oh oh

And we will never be alone again
'Cause it doesn't happen every day
Kinda counted on you being a friend
Can I give it up or give it away?

Now I thought about what I wanna say
But I never really know where to go
So I chained myself to a friend
'Cause I know it unlocks like a door

And we will never be alone again
'Cause it doesn't happen every day
Kinda counted on you being a friend
Can I give it up or give it away?
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """So pessimistic
So narcissistic
So cynical
Welcome to my own little world
A false commitment
Oh, I never listened
And I'm just a problem
And no one's ever solved it

Oh, I don't think that I could be the one that you want me to be
It's hard for me sometimes to see the light inside my love

I, I, I, I want to run the world
I, I, I, I want to run the
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """When I get home
You better not be there
We're placing bets, you won't
Shed your modesty

And the only thing to leave behind
Is your own skin on the floor

Don't you shy away (ah)
Manifest a ceiling when you shy away (ah)
Searching for that feeling
Just like an "I love you" (ooh, ooh)
That isn't words (ah)
Like a song he wrote
That's never heard
Don't you sh-

When you get home
You barely recognize the pictures
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Let your hair down and put on your party dress
Let's live our favorite story with no second guess
Told me it's all easier when you do what you're told
Borrow my leg to stand on, let's get out of control

Give me my daily dose of your coquetry
Yeah, I've put some thought into poetry
A summer's eve shall I compare to thee?
Or is it not to be?

Oh, it smells like summer
It smells like summer
It feels like letting go
Oh, it smells like summer
Your smile's like summer
I think we ought to let him know
We won't be waiting for the weekend
We're waiting on the sun
We don't need anyone's permission
To have a little bit of fun
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """When I'm furthest from myself (far away)
Feeling closer to the stars (outer space)
I've been invaded by the dark (can't escape)
Trying to recognize myself when I feel I've been replaced

When I'm furthest from myself (far away)
Feeling closer to the stars (outer space)
I've been invaded by the dark (can't escape)
Trying to recognize myself when I feel I've been replaced

(Oh) but I can feel a kick down in my soul
(Oh) and it's pulling me back to Earth to let me know
(Oh) I am not a slave, can't be contained
So pick me from the dark and pull me from the grave 'cause

I still feel alive
When it is hopeless, I start to notice
That I still feel alive
Falling forward, back into orbit, yeah

So when I lose my gravity in this sleepy womb
Drifting as I dream, but I'll wake up soon
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """I want to know
Where I can go
When you're not around
And I'm feeling down
So won't you stay for a moment
So I can say
I, I need you so

'Cause right now you know that nothing here's new
And I'm obsessed with you
Then I fell to the ground
And you smiled at me and said

I don't wanna see you cry
You don't have to feel this emptiness
She said I love you till the day that I die
Well maybe she's right
'Cause I don't wanna feel like I'm not me
And to be honest I don't even know why
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """And all I am is a man
I want the world in my hands
I hate the beach but I stand
In California with my toes in the sand
Use the sleeves of my sweater
Let's have an adventure
Head in the clouds but my gravity's centered
Touch my neck and I'll touch yours
You in those little high-waisted shorts, oh

She knows what I think about
And what I think about
One love, two mouths
One love, one house
No shirt, no blouse
Just us, you find out
Nothing that I wouldn't wanna tell you about, no

'Cause it's too cold
For you here and now
So let me hold
Both your hands in the holes of my sweater

And if I may just take your breath away
I don't mind if there's not much to say
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """An-nyŏng-ha-se-yo

Sometimes you gotta bleed to know
That you're alive and have a soul
But it takes someone to come around
To show you how

She's the tear in my heart
I'm alive
She's the tear in my heart
I'm on fire
She's the tear in my heart
Take me higher
Than I've ever been

The songs on the radio are okay
But my taste in music is your face
And it takes a song to come around
To show you how

She's the tear in my heart
I'm alive
She's the tear in my heart
I'm on fire
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """One, two, three, four

Need a boy who can cuddle with me all night
Keep me warm, love me long, be my sunlight
Tell me lies, we can argue, we can fight
Yeah, we did it before, but we'll do it tonight

An afro, black boy with the gold teeth
With dark skin, looking at me like he know me
I wonder if he got the G or the B
Let me find out and see, coming over to me, yeah

These days, I'm way too lonely
I'm missing out, I know
These days, I'm way too alone
And I'm known for giving love away, but
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Someone said they left together
I ran out the door to get her
She was holding hands with Trevor
Not the greatest feeling ever

Said, "Pull yourself together
You should try your luck with Heather"
Then I hope they slept together
Oh, the less I know the better

The less I know the better

Oh my love, can't you see yourself by my side?
No surprise when you're on his shoulder like every night
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Baby, I know pain is as natural as the rain
I just thought it didn't rain in California
Baby, I know love isn't what I thought it was
'Cause I've never known a love like this before ya

Baby, I know dreams tend to crumble at extremes
I just thought our dream would last a little bit longer
There's a time when every man draws a line down in the sand
We're surviving, we're still living I was stronger

You've been cheating on, cheating on me
I've been cheating on, cheating on you
You've been cheating on me
But I've been cheating through this life
And all its suffering
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """I'm feeling rough, I'm feeling raw, I'm in the prime of my life
Let's make some music, make some money, find some models for wives
I'll move to Paris, shoot some heroin and fuck with the stars
You man, the island and the cocaine and the elegant cars

This is our decision, to live fast and die young
We've got the vision, now let's have some fun
Yeah, it's overwhelming, but what else can we do?
Get jobs in offices and wake up for the morning commute?

Forget about our mothers and our friends
We're fated to pretend
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """Tastes like strawberries
On a summer evenin'
And it sounds just like a song

I want more berries
And that summer feelin'
It's so wonderful and warm

Breathe me in
Breathe me out
I don't know if I could ever go without
I'm just thinking out loud
I don't know if I could ever go without

Watermelon sugar
High
Watermelon sugar
High
Watermelon sugar
High
Watermelon sugar high
Watermelon sugar

Strawberries
On a summer evenin'
Baby, you're the end of June

I want your belly
And that summer feelin'
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
    """I asked you to stop and go
I've burnt all my feelings, so
So I can no longer see
The damage I've left in here

But I'm asking again to try
I've seen all the monsters die
Now I'm sure that I am the one to change
So I still, I still, I still ask

Where did your love go?
Is it real? Is it here?
...

******* This Lyrics is NOT for Commercial use *******
(1409623757107)""",
]


# User input
user_input_lyrics = """
The mandem too inconsiderate
Five-star hotel, smoking cigarette
Mixin' codeine up with the phenergan
She got thick but she wanna get thin again
Drinkin' apple cider vinegar
Wearin' Skim 'cause she wanna be Kim and 'em
Uh, alright
I know that you're bad, stop actin' innocent
We ain't got generational wealth
It's only a year that I've had these millions
My whip could've been in the Tokyo Drift 'cause it's fast and furious
I went from the Toyota Yaris to Urus
They had their chance but blew it
Now this gyal want me in her uterus
Fuck it, I'm rich, let's do it (fuck it)
Take a look at these diamonds wrong
It's a life of squintin', can't just stare
With bae through thick and thin
She already thick, so I'm halfway there
Brown and bad
Couldn't change my mind, I was halfway there
One hundred meters, huh
I just put nine gyal in a Sprinter (uh)
One hundred eaters
They won't fit in one SUV (nah)
S-O-S, somebody rescue me
I got too many gyal, too many-many gyal, I got
They can last me the next two weeks (uh, huh)
Alright, like send the address through please
SUV, the outside white
The inside brown like Michael Jack
More time man build a line and trap
Spend like I don't even like my stack
Pistol came on a Irish ferry
Let go and it sound like a tap dance
The way that I ball
No yellow, the ref have to give me a black card
Who did what we're doin' with rap?
Man couldn't sell out his show after all them years of doin' the cap
Sprinter, two gyal in a van
Inter, two man in Milan
Heard one of my tings datin' P. Diddy
Need twenty percent of whatever she bags
Outside, my head in my hands
I told her my name is Cench
She said "no, the one on your birth certificate"
Your boyfriend ran from that diamond test
'Cause they wasn't legitimate (nah)
She Turkish-Cypriot but her curves Brazilian
I want her and bro wants her affiliate
I'm cheap, still hit a chick like "yo, can I borrow your Netflix?"
She a feminist, she think I'm sexist
Twistin' my words, I think she dyslexic
Give me my space, I'm intergalactic
Before I give you my Insta password
I'll give you the pin to my AmEx
Huh, alright
This ain't stainless steel, it's platinum
Dinner table, I got manners, huh
T-shirt tucked in, napkin
"Still loadin'" that's the caption
I've only amounted a minimal fraction
Eat good, I got indigestion
Bare snow in my hood, no Aspen
Can't get rid of my pain with Aspirin
Dave just came in a Aston, I'm makin' that Maybach Music (Maybach Music)
They're tryna insult my intelligence, sometimes I may act stupid
I never went Uni, I been on a campus selling cocaine to students
If bro let the drumstick beat
Then something gon' leak, we ain't playin' exclusives
Take a look at these diamonds wrong
It's a life of squintin', can't just stare
With bae through thick and thin
She already thick, so I'm halfway there
Brown and bad
Couldn't change my mind, I was halfway there
One hundred meters, huh
I just put nine gyal in a Sprinter
One hundred eaters
They won't fit in one SUV (nah)
S-O-S, somebody rescue me
I got too many gyal, too many-many gyal, I got
They can last me the next two weeks (uh, huh)
Alright, like send the address through please
Fire for a wife beater
Can't rock with that, I ain't wearin' a vest
Man have to send her therapy
She got a E cup bra, a lot on her chest
I'm in Jamaica, Oracabess'
Hit a lick, went Cash Converters
That don't work, it's pawn, no chess
I'm doin' more and talkin' less
I love chillin' with broke bitches
Man book one flight and they all impressed
I'm in the G63
The car hug me like a friend through twist and turns
Man livin' for nyash and dyin' for nyash, it's fucked
Don't know which one's worse, I'm fucked
Bags in his and hers
What's hers is hers, what's mine is too
Heard that girl is a gold digger
It can't be true if she dated you
AP baby blue, paper's pink
I'd probably hate me too
You ever spent six figures and stared at bae like
"Look what you made me do"?
Yeah, (alright) started with a Q, didn't wait in line
Weird, I'm askin' my Blasian one
"Why you so focused on your Asian side?"
I know that the jack boys pray that they get to the clubs and Dave's inside
"""

# Combine user input with existing lyrics
lyrics.append(user_input_lyrics)
song_titles.append("User Input - ?")  # Placeholder for user input title

# TF-IDF vectorization
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(lyrics)

# Calculate cosine similarities
cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

# Get indices of songs sorted by similarity (excluding the user input)
similar_song_indices = cosine_similarities.argsort()[0][::-1][:-1]

# Recommend song titles based on similarity
recommended_song_titles = [song_titles[i] for i in similar_song_indices]

# Display recommended song titles
print("Recommended Songs:")
for i, title in enumerate(recommended_song_titles, start=1):
    print(f"{i}. {title}")
