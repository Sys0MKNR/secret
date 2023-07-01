<script lang="ts">
  export let fill = "none"
  export let data = ""
  export let width = 24
  export let height = 24
  export let stroke = "black" 
  export let strokeWidth = 2 
  export let strokeLinecap: "round" | "butt" | "square" | "inherit" = "round"
  let clazz = "";
	export { clazz as class };

  </script>  

    <svg class={clazz} width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" stroke={stroke} stroke-width={strokeWidth} stroke-linecap={strokeLinecap} >
      {@html data}
    </svg>
 


  <style>

  </style>
