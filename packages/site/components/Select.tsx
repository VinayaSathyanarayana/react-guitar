export default function Select<T>(props: {
  value: T
  values: T[]
  label: (t: T) => string
  onChange: (value: T) => void
}) {
  return (
    <select
      className="w-full appearance-none placeholder-gray-500 placeholder-opacity-100 border rounded h-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={props.label(props.value)}
      onChange={e => {
        const value = props.values.find(
          value => props.label(value) === e.target.value
        )
        value && props.onChange(value)
      }}
    >
      {props.values.sort().map((value, i) => (
        <option key={i} value={props.label(value)}>
          {props.label(value)}
        </option>
      ))}
    </select>
  )
}
