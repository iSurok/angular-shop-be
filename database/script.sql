CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
    id UUID primary key DEFAULT uuid_generate_v4 (),
    title text not null,
    description TEXT,
    price integer,
    logo TEXT
);

CREATE INDEX products_title_idx ON public.products (title);
CREATE INDEX products_description_idx ON public.products (description);

create table IF NOT EXISTS stocks (
    id UUID DEFAULT uuid_generate_v4 (),
    product_id uuid,
    count integer,
    foreign key ("product_id") references "products" ("id")
);


insert into products (title, description, price, logo)
values
(
	'The lord of the rings. The Fellowship of the Ring',
	'The first part of J. R. R. Tolkien’s epic adventure THE LORD OF THE RINGS‘A most remarkable feat’ GuardianIn a sleepy village in the Shire, a young hobbit is entrusted with an immense task. He must make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ruling Ring of Power – the only thing that prevents the Dark Lord Sauron’s evil dominion.Thus begins J. R. R. Tolkien’s classic tale of adventure, which continues in The Two Towers and The Return of the King.',
	99,
	'https://cv7.litres.ru/pub/c/elektronnaya-kniga/cover_330/63156870-dzhon-tolkin-the-fellowship-of-the-ring-63156870.jpg'
),
(
	'The lord of the rings. The Two Towers',
	'The second part of J.R.R. Tolkien’s epic adventure THE LORD OF THE RINGS‘Among the greatest works of imaginative fiction of the twentieth century.’ Sunday TelegraphThe company of the Ring is torn asunder. Frodo and Sam continue their journey alone down the great River Anduin – alone, that is, save for the mysterious creeping figure that follows wherever they go.This continues the classic tale begun in The Fellowship of the Ring, which reaches its awesome climax in The Return of the King.',
	100,
	'https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_330/63179985-dzhon-tolkin-the-two-towers-63179985.jpg'
),
(
	'The lord of the rings. The Return of the King',
	'The third part of J.R.R. Tolkien’s epic adventure THE LORD OF THE RINGS‘Extraordinarily imaginative, and wholly exciting’ The TimesThe armies of the Dark Lord are massing as his evil shadow spreads even wider. Men, Dwarves, Elves and Ents unite forces to battle against the Dark. Meanwhile, Frodo and Sam struggle further into Mordor in their heroic quest to destroy the One Ring.The devastating conclusion of J.R.R. Tolkien’s classic tale of adventure, begun in The Fellowship of the Ring and The Two Towers.',
	101,
	'https://cv5.litres.ru/pub/c/elektronnaya-kniga/cover_330/63128755-dzhon-tolkin-the-return-of-the-king.jpg'
),
(
	'Animal Farm: a Fairy Story and Essay''s Collection',
	'Animal Farm (1945) is considered one of Orwell''s most popular and enduring works. Utilizing the form of the animal fable, the short novel chronicles the story of a group of barnyard animals that revolt against their human masters in an attempt to create a utopian state. On a larger scale, commentators widely view Animal Farm as an allegory for the rise and decline of socialism in the Soviet Union and the emergence of the totalitarian regime of Joseph Stalin. Critics regard the story as an insightful and relevant exploration of human nature as well as political systems and social behavior. After its translation into Russian, it was banned by Stalin''s government in all Soviet-ruled areas.',
	222,
	'https://cv0.litres.ru/pub/c/elektronnaya-kniga/cover_330/37396003-dzhordzh-oruell-animal-farm-a-fairy-story-and-essay-s-collection-skotnyy-d.jpg'
),
(
	'The Mystery of Marie Roget. Stories',
	'The Mystery of Marie Roget (1842) is Edgar Allan Poe’s second story featuring his philosophic amateur detective the Chevalier C. Auguste Dupin. This intellectual super-sleuth made his first appearance the year before in The Murders in the Rue Morgue and appeared for the last time in Poe’s 1844 story, The Purloined Letter.',
	254,
	'https://cv3.litres.ru/pub/c/elektronnaya-kniga/cover_330/36352333-edgar-po-the-mystery-of-marie-roget-stories-tayna-mari-rozhe-rasskazy-knig.jpg'
),
(
	'The Financier',
	'Published in 1912, The Financier, a novel Theodore Dreiser, is the first volume of the Trilogy of Desire, which includes The Titan (1914) and The Stoic (1947).',
	299,
	'https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_330/36302660-teodor-drayzer-the-financier-finansist-kniga-dlya-chteniya-na-angliyskom-y.jpg'
);


insert into stocks (product_id, count) select id, 30 from products where title = 'The lord of the rings. The Fellowship of the Ring';
insert into stocks (product_id, count) select id, 30 from products where title = 'The lord of the rings. The Two Towers';
insert into stocks (product_id, count) select id, 30 from products where title = 'The lord of the rings. The Return of the King';
insert into stocks (product_id, count) select id, 21 from products where title = 'Animal Farm: a Fairy Story and Essay''s Collection';
insert into stocks (product_id, count) select id, 11 from products where title = 'The Mystery of Marie Roget. Stories';
insert into stocks (product_id, count) select id, 4 from products where title = 'The Financier';
