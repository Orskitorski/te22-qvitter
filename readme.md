# Qvitter

## Routes
Jag har två javascript-filer som innehåller alla mina routes. En index.js som innehåller main-sidan, ("/"), dvs sidan man hamnar på när man först navigerar till hemsidan. Sedan hade jag alla andra routes i tweets.js, såsom "/tweets", "/tweets/edit", "/tweets/post", "/tweets/favourites" och allting annat som behövdes för att alla dessa funktioner skulle fungera, ("/tweets/:id/edit" (editar tweeten med hjälp av id), "/tweets/:id/delete" (raderar tweet med hjälp av id), "/tweets/:id/favourite" (lägger till tweet i favoriter med hjälp av id))

## Säkerhet
Jag har dessutom lagt till lite säkerhetsåtgärder i form av checkar som kollar om inputen är en integer när sidan hanterar id. Så om jag till exempel skulle försöka stoppa in någonting annat än ett nummer i fältet ":id" på alla sidor som har denna variabeln så kommer användaren skickas till en sida som säger "Invalid ID", detta för att säkra mot sql-injektioner och annat som kan förstöra databasen. 

## Extra Funktioner
En extra funktion jag har lagt till är favourites-sidan. Användaren kan på "/tweets"-sidan trycka på stjärnikonen under en tweet och lägga till den i sina favoriter. Då skickas tweet-id:et samt användarens id (i detta fall 1 eftersom vi inte har lagt till login ännu) till en tabell som heter "favourites", med hjälp av denna kod:

```
await pool.promise().query('INSERT INTO favourites (tweet_id, user_id) VALUES (?, ?)', [id, 1])
```

Där kan vi alltså få ut vilken tweet som är likead och vilken användare som likeat den. Sedan kan användaren gå in på sidan "/tweets/favourites" där sidan visar vilka tweets som användaren har som sina favoriter genom detta kodblock:

```
const [favourites] = await pool.promise().query(
    `SELECT * FROM favourites 
    JOIN tweet ON favourites.tweet_id = tweet.id 
    JOIN user ON tweet.author_id = user.id 
    ORDER BY created_at DESC;`
)
```

Sedan spenderade jag såklart också lite tid åt att göra sidan lite finare, t.ex med outlines runt tweetsen + ikoner för vissa knappar.

## Vad gick bra?
Det mesta under detta projekt gick ganska bra. Jag förstod mig på syntaxen på javascript-delarna ganska bra och mot slutet började jag även förstå lite mer sql så att jag kunde skapa en egen sql-fråga till min favourites-tabell.

## Vad gick dåligt?
I början var det lite strul med att lära sig alla olika delar, såsom att lära sig använda tableplus, sql-frågor osv. Men annars har det inte varit så mycket strul förutom när jag försökte fixa med css :(