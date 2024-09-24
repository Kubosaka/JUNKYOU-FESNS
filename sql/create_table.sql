drop table if exists users cascade;
drop table if exists posts cascade;
-- ----------------------------------------------------------------------------------------------------

create table users (
    id serial not null,             -- ID
    name text not null,             -- ユーザー名
    created_at timestamp not null,  -- 作成日時
    primary key (id)
);

create table posts (
    id serial not null,             -- ID
    context text not null,          -- ユーザー名
    user_id integer not null,       -- ユーザーID
    area_id integer not null,       -- エリアID
    latitude double precision not null,  -- 緯度
    longitude double precision not null, -- 経度
    created_at timestamp not null,  -- 作成日時
    primary key (id)
);
