import { FormEvent, useEffect, useState } from "react";
import Input from "../common/Input";
import { DetailPlace } from "@/model/place";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchPlace() {
  const [input, setInput] = useState("");
  const debounceValue = useDebounce(input, 500);
  const [places, setPlaces] = useState<DetailPlace[]>([]);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      setIsLoading(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", input);
    router.replace(`/search?${params}`);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      if (debounceValue) {
        const res = await fetch(`/api/search/${debounceValue}/autocomplete`);
        const places = await res.json();
        setIsLoading(false);
        setPlaces(places);
      }
    };
    fetchPlaces();
  }, [debounceValue]);

  useEffect(() => {
    setShowList(input.length ? true : false);
  }, [input]);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center h-10">
        <Input
          placeholder="식당 이름 또는 관련 키워드로 검색해보세요!"
          value={input}
          onChange={handleChange}
          onBlur={() =>
            setTimeout(function () {
              setShowList(false);
            }, 500)
          }
        />
        <button
          className="flex items-center absolute right-4 text-neutral-400"
          onClick={handleSubmit}
        >
          <FaSearch />
        </button>
      </form>
      {showList && (
        <div className="h-fit bg-white z-20 rounded-lg shadow-sm">
          {isLoading ? (
            <div className="py-4">
              <ClipLoader color="#ef4444" />
            </div>
          ) : (
            <ul className="text-left">
              {places &&
                places.map((place, idx) => (
                  <Link key={idx} href={`/place/${place.place_id}/detail`}>
                    <li
                      key={idx}
                      className="flex p-3 gap-6 items-center hover:bg-neutral-50 cursor-pointer"
                    >
                      <p className="font-medium">{place.name}</p>
                      <p className="text-neutral-500 text-sm">
                        {place.content}
                      </p>
                    </li>
                  </Link>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
