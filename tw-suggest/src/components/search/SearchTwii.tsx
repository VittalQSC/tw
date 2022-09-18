import useClickOutside from "../../hooks/useClickOutside";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { getSuggests } from "../../api";

import "../../styles/main.scss";

interface IProps {
  onSearchSubmit?: (inputs: Inputs) => void;
  onUserClick?: (userId: any) => void;
}

interface Inputs {
  searchQuery: string;
}

export default observer(function SearchTwii(props: IProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const query = useWatch({ control, name: "searchQuery" });
  const [focused, setFocused] = React.useState(true);
  const [openned, setOpenned] = React.useState(false);

  const formRef = React.useRef(null);

  useClickOutside(formRef, () => {
    setOpenned(false);
  });

  React.useEffect(() => {
    focused && setOpenned(true);
  }, [focused])
  

  const [suggests, setSuggests] = React.useState([]);

  React.useEffect(() => {
    onQueryChange();
  }, [query]);

  async function onQueryChange() {
    if (!query) {
      setSuggests([]);
      return;
    }

    const suggests = await getSuggests(query);
    setSuggests(suggests);
  }

  function onSubmit(data: Inputs) {
    console.log("searchQuery,", data.searchQuery);
    props?.onSearchSubmit(data);
  }

  return (
    <form className="relative inline-block" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <input
        className="p-[20px] w-full outline-0 rounded-full bg-slate-200 focus-within:bg-white focus-within:border-blue-600 focus-within:border-2"
        placeholder="Search Twii"
        {...register("searchQuery")}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
      {suggests?.length > 0 && openned && (
        <div className="absolute bg-white p-[20px] rounded-3xl drop-shadow-2xl border-slate-400 bg-white w-full">
          <ul>
            {suggests.map((s) => (
              <li key={s.id} onClick={() => props?.onUserClick(s.id)}>{s.name}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
});
