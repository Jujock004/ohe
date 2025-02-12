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
  (1, "Jujock", "julien.joecker@gmail.com", "123456", ".../.../.../...client/src/assets/images/39887070_10210887801145337_4060678762738483200_n.jpg");
  insert into event(id, title, user_id, description, hour, date, location)
    values
      (1, "Stuff", 1, "Description for Stuff", '12:00:00', '2023-10-01', "Location 1"),
      (2, "Doodads", 1, "Description for Doodads", '14:00:00', '2023-10-02', "Location 2"),
      (3, "Widgets", 1, "Description for Widgets", '16:00:00', '2023-10-03', "Location 3"),
      (4, "Gizmos", 1, "Description for Gizmos", '18:00:00', '2023-10-04', "Location 4"),
      (5, "Thingamajigs", 1, "Description for Thingamajigs", '20:00:00', '2023-10-05', "Location 5"),
      (6, "Doohickeys", 1, "Description for Doohickeys", '22:00:00', '2023-10-06', "Location 6");
