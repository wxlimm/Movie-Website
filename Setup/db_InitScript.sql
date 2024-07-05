CREATE DATABASE  IF NOT EXISTS `finalAssignment`;
USE `finalAssignment`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: finalAssignment
--
-- Table structure for table `users`
--
-- P2026198 LIM WEI XIONG DISM-FT/2A-02/

CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contact` int(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_pic_url` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO users (userid,username,email,contact,password,type,profile_pic_url) VALUES 
(1,"Terry Tan","terry@gmail.com","91234567","abc123456","Customer","imagesforuser/shrek.jpg"),
(2,"Admin","spmovieadmin@gmail.com","68371937","1qwer$#@!","Admin",NULL),
(3,"Galaxy Slayer Zed","gszed@gmail.com","63213211","zed!!!","Customer","imagesforuser/ZED.jfif");

CREATE TABLE `movie` (
  `movieid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` longtext NOT NULL,
  `cast` varchar(255) NOT NULL,
  `time` varchar(45) NOT NULL,
  `image_path` varchar(45) DEFAULT NULL,
  `opening date` varchar(45) NOT NULL,
  PRIMARY KEY (`movieid`)  
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT  INTO movie (movieid, title, description, cast, time, image_path, `opening date`) VALUES 
(1,"Godzilla vs. Kong","Legends collide as Godzilla and Kong, the two most powerful forces of nature, clash on the big screen in a spectacular battle for the ages. As a squadron embarks on a perilous mission into fantastic uncharted terrain, unearthing clues to the Titans' very origins and mankind's survival, a conspiracy threatens to wipe the creatures, both good and bad, from the face of the earth forever","Shun Oguri, Rebecca Hall, Kyle Chandler, Millie Bobby Brown, Brian Tyree Henry, Alexander Skarsgård , Eiza González, Julian Dennison, Demián Bichir","113 mins","images/Godzilla.jpg","24 Mar 2021"),
(2,"Fast and Furious 9","Vin Diesel's Dom Toretto is leading a quiet life off the grid with Letty and his son, little Brian, but they know that danger always lurks just over their peaceful horizon. This time, that threat will force Dom to confront the sins of his past if he's going to save those he loves most.","Vin Diesel, Michelle Rodriguez, Jordana Brewster, Tyrese Gibson, Ludacris, Nathalie Emmanuel, John Cena","145 mins","images/Fast9.jpg","19 May 2021"),
(3,"Deadpool 2","Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.","Karan Soni, Zazie Beetz, Islie Hirvonen, Paul Wu, Alan Tudyk","121 mins","images/Deadpool2.jpg","10 May 2018"),
(4,"Transformers: The Last Knight","Autobots and Decepticons are at war, with humans on the sidelines. Optimus Prime is gone. The key to saving our future lies buried in the secrets of the past, in the hidden history of Transformers on Earth.","Liam Garrigan, Tony Hale, Kevin Kent, Ken Watanabe, Walles Hamonde","149 mins","images/transformers 5.jpg","16 Jun 2017"),
(5,"Finding Nemo","Nemo, an adventurous young clownfish, is unexpectedly taken from his Great Barrier Reef home to a dentist's office aquarium. It's up to his worrisome father Marlin and a friendly but forgetful fish Dory to bring Nemo home -- meeting vegetarian sharks, surfer dude turtles, hypnotic jellyfish, hungry seagulls, and more along the way.","Albert Brooks, Stephen Root, Ellen DeGeneres, Nicholas Bird, Vicki Lewis","100 mins","images/FindingNemo.jpg","24 Mar 2021"),
(6,"A Quiet Place"," If they hear you, they hunt you. A family must live in silence to avoid mysterious creatures that hunt by sound. Knowing that even the slightest whisper or footstep can bring death, Evelyn and Lee are determined to find a way to protect their children while desperately searching for a way to fight back.","Emily Blunt, John Krasinski, Millicent Simmonds, Noah Jupe, Cade Woodward","90 mins","images/QuietPlace.jpg","9 Mar 2018"),
(7,"The Conjuring: The Devil Made Me Do It","Paranormal investigators Ed and Lorraine Warren take on one of the most sensational cases of their careers after a cop stumbles upon a dazed and bloodied young man walking down the road. Accused of murder, the suspect claims demonic possession as his defense, forcing the Warrens into a supernatural inquiry unlike anything they've ever seen before.","Patrick Wilson, Vera Farmiga","112 mins","images/Conjuring3.jpg","11 Jun 2021"),
(8,"Iron Man 3","When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.","Adam Pally, Shaun Toub, Joan Rivers, Megan Henderson, Matthew Sterling Nye","131 mins","images/IronMan3.jpg","18 Apr 2013"),
(9,"Avengers: Endgame","The universe Remains due to Their Mad Titan, Thanos' efforts. With the aid of allies that are remaining, the Avengers must build to undo Thanos' actions and restore order to the world once and for all.","Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Don Cheadle, Paul Rudd, Benedict Cumberbatch, Chadwick Boseman, Brie Larson, Tom Holland, Karen Gillan, Zoe Saldana, Evangeline Lilly, Tessa Thompson","181 mins","images/Endgame.jpg","24 Apr 2019"),
(10,"Infinite","A troubled young man haunted by memories of two past lives stumbles upon the centuries-old secret society of similar individuals and dares to join their ranks.","Jason Mantzoukas, Sophie Cookson, Kae Alexander, Toby Jones, Joana Ribeiro","130 mins","images/Infinite.jpg","8 Sep 2021"),
(11,"The Forever Purge","All the rules are broken as a sect of lawless marauders decides that the annual Purge does not stop at daybreak and instead should never end.","Ana de la Reguera, Susie Abromeit, Mark Krenik, Edward Gelhaus, Sammi Rotibi","103 mins","images/4EverPurge.jpg","30 Jun 2021"),
(12,"Wrath of Man","H is a cold and mysterious character working at a cash truck company responsible for moving hundreds of millions of dollars around Los Angeles each week.","Jeffrey Donovan, Laz Alonso, Raúl Castillo, Lyne Renee, Matthew Illesley","118 mins","images/Wrath.jpg","22 Apr 2021"),
(13,"A Quiet Place Part II","Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize that the creatures that hunt by sound are not the only threats that lurk beyond the sand path.","Emily Blunt, Millicent Simmonds, Blake DeLong, Ashley Dyke, Gary Sundown","97 mins","images/QuietPlace2.jpg","21 Apr 2021");

CREATE TABLE `genre` (
  `genreid` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`genreid`),
  UNIQUE KEY `genre_UNIQUE` (`genre`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO genre (genreid,genre,description) VALUES 
(1,"Action", "the action genre has close ties to classic strife and struggle narratives that you find across all manner of art and literature"),
(2,"Comedy","Comedy is a genre of fiction consisting of discourses or works intended to be humorous or amusing by inducing laughter"),
(3,"Sci-fi","Science fiction is a genre of speculative fiction that contains imagined elements that don't exist in the real world"),
(4,"Horror","the action genre has close ties to classic strife and struggle narratives that you find across all manner of art and literature"),
(5,"Drama","The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences. Drama is a very broad category and untethered to any era"),
(6,"Fantasy","The fantasy genre is defined by both circumstance and setting inside a fictional universe with an unrealistic set of natural laws. The possibilities of fantasy are nearly endless, but the movies will often be inspired by or incorporate human myths."),
(7,"Crime","The crime genre deals with both sides of the criminal justice system but does not focus on legislative matters or civil suits and legal actions. The best crime movies often occupy moral gray areas where heroes and villains are much harder to define. "),
(8,"Animated","The animation genre is defined by inanimate objects being manipulated to appear as though they are living. This can be done in many different ways and can incorporate any other genre and sub-genre on this list."),
(9,"Western","Westerns are defined by their setting and time period. The story needs to take place in the American West, which begins as far east as Missouri and extends to the Pacific ocean. Theyâ€™re set during the 19th century, and will often feature horse riding, military expansion, violent and non-violent interaction with Native American tribes, the creation of railways, gunfights, and technology created during the industrial revolution. "),
(10,"Science Fiction","Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science."),
(11,"Military Action","Here the sub-genre focuses on the exploits of the military as entertaining versus tragic. Examples of this include movies such as Transformers or the G.I. Joe series."),
(12,"Superhero","This sub-genre is defined by the heroes having supernatural abilities, and more importantly, using their superpowers for selfless purposes. They battle with villains with similar super-powers. They are usually, but not necessarily, derived from superhero comic books."),
(13,"Musical","Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by dancing. The songs usually advance the plot or develop the film's characters, but in some cases, they serve merely as breaks in the storyline, often as elaborate production numbers."""),
(14,"Noir","Film noir is a cinematic term used primarily to describe stylish Hollywood crime dramas, particularly those that emphasize cynical attitudes and motivations. The 1940s and 1950s are generally regarded as the classic period of American film noir."),
(15,"Adventure","Adventure fiction is a genre of fiction that usually presents danger, or gives the reader a sense of excitement."),
(16,"Thriller","Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.");

CREATE TABLE `movie_genres` (
  `movie_genreid` int(11) NOT NULL AUTO_INCREMENT,
  `movieid_fk` int(11) NOT NULL,
  `genreid_fk` int(11) NOT NULL,
  PRIMARY KEY (`movie_genreid`),
  KEY `genreid_fk_idx` (`genreid_fk`),
  KEY `movieid_fk_idx` (`movieid_fk`),
  CONSTRAINT `genreid_fk` FOREIGN KEY (`genreid_fk`) REFERENCES `genre` (`genreid`) ON DELETE CASCADE,
  CONSTRAINT `movieid_fk` FOREIGN KEY (`movieid_fk`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO movie_genres (movie_genreid,movieid_fk,genreid_fk) VALUES 
(1,1,1),(2,1,10),(3,2,1),(4,2,7),(5,2,16),(6,3,1),(7,3,2),(8,3,15),(9,4,1),(10,4,10),(11,4,16),(12,4,15),(13,5,8),(14,6,5),(15,6,4),
(16,6,16),(17,6,10),(18,7,4),(19,7,16),(20,8,1),(21,8,15),(22,8,10),(23,9,15),(24,9,10),(25,9,1),(26,10,10),(27,10,15),(28,10,5),
(29,10,1),(30,11,4),(31,11,1),(32,11,16),(33,12,7),(34,12,1),(35,13,16),(36,13,10),(37,13,5);

CREATE TABLE `review` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `movieid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `review` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `userid_idx` (`userid`),
  KEY `movieid_idx` (`movieid`),
  CONSTRAINT `movieidfk` FOREIGN KEY (`movieid`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE,
  CONSTRAINT `useridfk` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO review (reviewid,movieid,userid,rating,review) VALUES 
(1,1,1,5,"Good Movie, love the action"), 
(2,1,3,4,"Great Movie, good storyline"),
(3,2,1,1,"Excellent Movie"),
(4,2,3,1,"Very bad."),
(5,1,3,4,"Great Movie, enjoyed the animation");

