import Spinner from "../../ui/Spinner";
import { LuDot } from "react-icons/lu";

function SingleBlogPage({
  blog: {
    author,
    categories,
    description,
    email,
    image,
    publish_date,
    title,
  } = {},
  isLoading,
}) {
  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-7">
      <img src={image} className="h-[328px] w-full rounded-xl object-cover" />
      <div className="space-y-1">
        <h1 className="font-bold">{author}</h1>
        <div className="flex items-center text-sm text-[#85858D]">
          <p>{publish_date}</p>
          <LuDot className="text-lg" />
          <p>{email}</p>
        </div>
      </div>
      <h1 className="text-4xl font-bold">{title}</h1>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              color: category.text_color,
              background: category.background_color,
            }}
            className={`whitespace-nowrap rounded-full border-none px-2.5 py-1.5 outline-none duration-100`}
          >
            {category.title}
          </li>
        ))}
      </ul>
      <div className="h-80 space-y-10 overflow-y-scroll">
        {/* {description.split("\n").map((stroke, index) => (
          <p key={index}>{stroke}</p>
        ))} */}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tempore
        magnam assumenda incidunt suscipit? Sunt a magni consequuntur, tempora
        voluptate id nisi quidem beatae repellat doloribus qui, cupiditate
        quaerat earum dicta aut corporis dolore cum voluptatum. Labore, ea alias
        doloribus quas repellat earum eligendi, fuga, itaque similique tempora
        sapiente quod unde aliquid voluptatem perferendis repellendus dolor vero
        repudiandae praesentium molestiae sequi consectetur atque officia?
        Voluptatibus distinctio sint pariatur architecto quos illo quidem dicta,
        doloremque dolorem qui fuga reiciendis voluptates perferendis iure. Quis
        quaerat fuga ipsum aliquid voluptates praesentium at repudiandae eaque
        alias, ratione totam, suscipit animi similique. In tenetur adipisci
        laborum nulla nobis sit velit! Veritatis, soluta nihil! Iste natus,
        necessitatibus ab beatae ratione inventore ex totam optio aspernatur,
        impedit exercitationem repellendus. Sed ut veritatis, nostrum, fugiat
        expedita ex minima quo ipsum, tempora tenetur et ab placeat? Possimus
        vero facilis voluptates blanditiis placeat, quasi libero voluptate alias
        laborum nulla fuga eos, perferendis corrupti iste autem et ipsum
        ducimus. Dicta magnam veniam blanditiis dolorem repellat provident,
        maiores libero nam deleniti magni incidunt nemo architecto quis tempora
        officia molestiae praesentium error neque accusantium omnis. Qui nostrum
        omnis tempore dolorem vitae maxime blanditiis, sint, repudiandae
        adipisci veniam, officiis quia sapiente architecto perspiciatis quis
        optio? Suscipit eum eveniet quas modi blanditiis perferendis quibusdam,
        nisi quam, maxime atque numquam non vitae tempore, dolorem soluta
        adipisci deserunt totam! Soluta eius culpa optio distinctio fugiat! Odit
        non provident, perferendis nihil soluta eos, velit amet quidem
        accusantium eveniet illum quibusdam modi aperiam, nobis corporis cumque
        atque commodi! Saepe eaque repellendus officiis nobis consequuntur?
        Officia temporibus praesentium perferendis autem, accusantium doloribus,
        repudiandae dolorem dicta fugit libero porro quis! Quod, aliquam vel?
        Animi impedit sunt, voluptates nobis provident dicta expedita voluptas
        possimus nostrum quo? Deleniti dolorum corporis aperiam velit voluptas
        non qui architecto, quod rerum quis quam perferendis illum ducimus in
        ratione maxime impedit, id illo accusamus cumque atque temporibus sit
        sequi modi. Perferendis sint illum, commodi beatae doloremque blanditiis
        quisquam dolorum error enim expedita odio. Earum possimus est ad
        perferendis praesentium animi necessitatibus magni nobis quibusdam,
        quisquam voluptatum debitis excepturi vitae accusantium odit esse eos
        sequi tenetur? Velit earum neque molestiae debitis mollitia dolorem
        harum, culpa voluptas veritatis, eum repudiandae est odit beatae,
        laboriosam perspiciatis voluptatum enim dolore commodi aliquid sunt
        sapiente. Molestiae eius, dolore omnis itaque veniam provident quod!
        Enim soluta nostrum velit delectus dolorem asperiores! Natus maiores
        nemo delectus earum, molestias nulla fuga praesentium magnam,
        accusantium rerum nisi totam ab. Ipsa esse beatae aut praesentium nam
        quas ea dolores labore obcaecati placeat aliquid asperiores, sit quidem
        itaque dolor eligendi provident enim exercitationem ab voluptas alias
        quod aspernatur! Quod quo nihil illo iste ex expedita ullam, veniam
        dolorum. Eveniet quis iure itaque sunt delectus id commodi incidunt quam
        rem soluta doloremque tempora aspernatur, saepe voluptate et iste
        cupiditate necessitatibus laudantium! Animi possimus reiciendis
        consequatur voluptates rem, iure aliquid adipisci. Accusamus quasi minus
        aliquam minima nemo voluptatum nisi ipsum consequatur ipsam magni
        officiis deleniti voluptatibus id eligendi, consequuntur esse, facere
        excepturi fugiat voluptate deserunt! Voluptas minima consectetur dolorem
        laboriosam.
      </div>
    </div>
  );
}

export default SingleBlogPage;
