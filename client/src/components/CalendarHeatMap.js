<div
  style={{
    display: "flex",
    justifyContent: "center",
    height: "100%",
  }}
>
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
    }}
  >
    <div style={{ display: "flex" }}>
      {weeks.map((week, weekIndex) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {week.map((day, dayIndex) => {
            const randomColor = getRandomColor();
            return (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  minWidth: "10px",
                  minHeight: "10px",
                  backgroundColor: randomColor,
                  margin: "2px",
                  borderRadius: "50%",
                }}
                title={day.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "12px",
        padding: "6px 0px 10px 10px",
      }}
    >
      <span
        style={{
          lineHeight: "12px",
          fontSize: "small",
          marginRight: "2px",
        }}
        className="text-color"
      >
        Less
      </span>
      <div style={{ display: "flex", marginTop: "1px" }}>
        <div
          style={{
            width: "10px",
            height: "10px",
            minWidth: "10px",
            minHeight: "10px",
            marginLeft: "1px",
            marginRight: "1px",
            backgroundColor: "rgb(255, 255, 255, .2)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            width: "10px",
            height: "10px",
            minWidth: "10px",
            minHeight: "10px",
            backgroundColor: "rgb(255, 255, 255, .4)",
            borderRadius: "50%",
            marginLeft: "1px",
            marginRight: "1px",
          }}
        />
        <div
          style={{
            width: "10px",
            height: "10px",
            minWidth: "10px",
            minHeight: "10px",
            backgroundColor: "rgb(255, 255, 255, .6)",
            borderRadius: "50%",
            marginLeft: "1px",
            marginRight: "1px",
          }}
        />
        <div
          style={{
            width: "10px",
            height: "10px",
            minWidth: "10px",
            minHeight: "10px",
            backgroundColor: "rgb(255, 255, 255, .8)",
            borderRadius: "50%",
            marginLeft: "1px",
            marginRight: "1px",
          }}
        />
        <div
          style={{
            width: "10px",
            height: "10px",
            minWidth: "10px",
            minHeight: "10px",
            backgroundColor: "rgb(255, 255, 255, .9)",
            borderRadius: "50%",
            marginLeft: "1px",
            marginRight: "1px",
          }}
        />
      </div>
      <span
        style={{ lineHeight: "12px", fontSize: "small", marginLeft: "1px" }}
        className="text-color"
      >
        More
      </span>
    </div>
  </div>
</div>;
