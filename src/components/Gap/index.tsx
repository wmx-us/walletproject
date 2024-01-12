interface Gap {
  bgColor?: string
  height?: string | number
}

const Gap = (props: Gap = { bgColor: 'transparent', height: 20 }) => {

  return (
    <div style={{ background: props.bgColor, height: props.height, width: '100%' }}></div>
  )
}

export default Gap
