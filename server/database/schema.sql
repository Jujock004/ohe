create table user (
  id int unsigned primary key auto_increment not null,
  pseudo varchar(255) not null unique,
  email varchar(255) not null unique,
  password varchar(255) not null,
  avatar_url varchar(2048)
);

create table event (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  description text not null,
  hour time not null,
  date date not null,
  location varchar(255) not null,
  image_url varchar(2048),
  foreign key(user_id) references user(id) ON DELETE CASCADE
);

create table participation (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null,
  event_id int unsigned not null,
  foreign key(user_id) references user(id) ON DELETE CASCADE,
  foreign key(event_id) references event(id) ON DELETE CASCADE
);

insert into user(id, pseudo, email, password, avatar_url)
values
  (1, "Jujock", "julien.joecker@gmail.com", "123456", "https://res.cloudinary.com/dgajrjjz8/image/upload/v1739291085/avatars/i1k55kbuwkvsyvn7ritd.jpg"),
  (2, "Alice", "alice@example.com", "password1", "avatar_url_2"),
  (3, "Bob", "bob@example.com", "password2", "avatar_url_3"),
  (4, "Charlie", "charlie@example.com", "password3", "avatar_url_4"),
  (5, "David", "david@example.com", "password4", "avatar_url_5"),
  (6, "Eve", "eve@example.com", "password5", "avatar_url_6"),
  (7, "Frank", "frank@example.com", "password6", "avatar_url_7"),
  (8, "Grace", "grace@example.com", "password7", "avatar_url_8"),
  (9, "Heidi", "heidi@example.com", "password8", "avatar_url_9"),
  (10, "Ivan", "ivan@example.com", "password9", "avatar_url_10"),
  (11, "Judy", "judy@example.com", "password10", "avatar_url_11");
  insert into event(id, title, user_id, description, hour, date, location, image_url)
  values
    (1, "Soirée Electro au Warehouse", 1, "Une soirée électro exceptionnelle avec DJ Snake en guest star! Au programme : house, techno et ambiance de folie. Dress code : tout en noir.", '23:00:00', '2024-03-15', "Warehouse, 10 rue de la Soif, Paris", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg"),
    (2, "Afterwork Networking Tech", 2, "Venez networker autour d'un verre avec les acteurs de la Tech parisienne. Présentation de startups et échanges informels.", '18:30:00', '2024-03-20', "Le Petit Journal, 15 rue Oberkampf, Paris", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg"),
    (3, "Concert Rock - Les Stones Covers", 3, "Le meilleur groupe de reprises des Rolling Stones en concert live! 2h de show explosif garanti.", '20:00:00', '2024-03-22', "La Boule Noire, 120 bd Rochechouart, Paris", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg"),
    (4, "Soirée Karaoké", 4, "Venez chanter vos tubes préférés dans une ambiance conviviale! Plus de 10000 titres disponibles.", '21:00:00', '2024-03-25', "Le Piano Bar, 45 rue de la Gaité, Paris", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg"),
    (5, "Jazz Night", 5, "Une soirée jazz avec le quartet de Sarah Johnson. Standards et compositions originales au programme.", '20:30:00', '2024-03-28', "Le Petit Journal Montparnasse, 13 rue du Commandant Mouchotte, Paris", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg"),
    (6, "Silent Party", 6, "Une expérience unique : 3 DJ's, 3 ambiances différentes sur vos casques! House, Latino et Rock.", '22:00:00', '2024-03-30', "Le Batofar, 11 quai François Mauriac, Paris", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg");

      insert into participation(user_id, event_id)
      values
        (1, 1),
        (2, 1),
        (3, 1),
        (4, 1),
        (5, 2),
        (6, 2),
        (7, 3),
        (8, 4),
        (9, 4),
        (10, 5),
        (11, 6);