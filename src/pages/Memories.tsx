import MemoryCard from "../components/memory-card";

const MemoriesPage = () => {
  function splitArrayRoundRobin<T>(
    longArray: T[],
    numberOfChunks: number
  ): T[][] {
    const result: T[][] = Array.from({ length: numberOfChunks }, () => []);

    for (let i = 0; i < longArray.length; i++) {
      result[i % numberOfChunks].push(longArray[i]);
    }

    return result;
  }
  console.log(
    splitArrayRoundRobin(
      [
        1, 2, 4, 4, 4, 5, 5, 34, 3, 43, 3, 434, 3, 3, 4, 43, 4, 34, 34, 34, 34,
        3, 43, 4, 34, 34, 34, 34, 3, 434, 3, 43, 4, 34, 34, 34, 34, 3, 4, 34, 3,
        4,
      ],
      5
    )
  );
  return (
    <div className=" p-4 lg:mx-auto">
      <h4 className="text-center font-cursive lg:text-[4.8rem]">Memory Wall</h4>
      <div className="grid lg:grid-cols-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <MemoryCard
            message={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iste omnis vitae delectus facilis commodi debitis corrupti quibusdam nesciunt eos?"
            }
            tags={["COE4", "GEYHEY20", "GESA"]}
            imageUrl={
              "data:image/webp;base64,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"
            }
            title="We love you Jojo ❤️"
          />
          <MemoryCard
            message={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iste omnis vitae delectus facilis commodi debitis corrupti quibusdam nesciunt eos?"
            }
            tags={["COE4", "GEYHEY20", "GESA"]}
            imageUrl={"/images/jojo.jpeg"}
            title="We love you Jojo ❤️"
          />
          <MemoryCard
            message={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iste omnis vitae delectus facilis commodi debitis corrupti quibusdam nesciunt eos?"
            }
            tags={["COE4", "GEYHEY20", "GESA"]}
            imageUrl={
              "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcScMejJl_dVY-FXKI28pRwJNkFmMUZSgEj_68b73NdBd5RPQC-T4A2GArNrBcAm_tALm5PgV1Sf812Dnd8"
            }
            title="We love you Jojo ❤️"
          />
          <MemoryCard
            message={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iste omnis vitae delectus facilis commodi debitis corrupti quibusdam nesciunt eos?"
            }
            tags={["COE4", "GEYHEY20", "GESA"]}
            imageUrl={"/images/jojo.jpeg"}
            title="We love you Jojo ❤️"
          />
          <MemoryCard
            message={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iste omnis vitae delectus facilis commodi debitis corrupti quibusdam nesciunt eos?"
            }
            tags={["COE4", "GEYHEY20", "GESA"]}
            imageUrl={"/images/jojo.jpeg"}
            title="We love you Jojo ❤️"
          />
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;
