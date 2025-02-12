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
  foreign key(user_id) references user(id)
);

create table participation (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null,
  event_id int unsigned not null,
  foreign key(user_id) references user(id),
  foreign key(event_id) references event(id)
);

insert into user(id, pseudo, email, password, avatar_url)
values
  (1, "Jujock", "julien.joecker@gmail.com", "123456", ".../.../.../...client/src/assets/images/39887070_10210887801145337_4060678762738483200_n.jpg"),
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
      (1, "Stuff", 1, "Description for Stuff", '12:00:00', '2023-10-01', "Location 1", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg?t=st=1739375058~exp=1739378658~hmac=66d61fc406e9719f75582ebed773c3148bb1446355e5ce5a8a45d1923aefac9c&w=996"),
      (2, "Doodads", 1, "Description for Doodads", '14:00:00', '2023-10-02', "Location 2", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg?t=st=1739375058~exp=1739378658~hmac=66d61fc406e9719f75582ebed773c3148bb1446355e5ce5a8a45d1923aefac9c&w=996"),
      (3, "Widgets", 1, "Description for Widgets", '16:00:00', '2023-10-03', "Location 3", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg?t=st=1739375058~exp=1739378658~hmac=66d61fc406e9719f75582ebed773c3148bb1446355e5ce5a8a45d1923aefac9c&w=996"),
      (4, "Gizmos", 1, "Description for Gizmos", '18:00:00', '2023-10-04', "Location 4", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg?t=st=1739375058~exp=1739378658~hmac=66d61fc406e9719f75582ebed773c3148bb1446355e5ce5a8a45d1923aefac9c&w=996"),
      (5, "Thingamajigs", 1, "Description for Thingamajigs", '20:00:00', '2023-10-05', "Location 5", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg?t=st=1739375058~exp=1739378658~hmac=66d61fc406e9719f75582ebed773c3148bb1446355e5ce5a8a45d1923aefac9c&w=996"),
      (6, "Doohickeys", 1, "Description for Doohickeys", '22:00:00', '2023-10-06', "Location 6", "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg?t=st=1739375058~exp=1739378658~hmac=66d61fc406e9719f75582ebed773c3148bb1446355e5ce5a8a45d1923aefac9c&w=996");

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