import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
بنداز تو لیست ارزوهام      </Tooltip>
    );
  }
  
  export const WishList = () => (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
        <img className="icon"
                    src={require("./../../../assets/icons/health-1.png")}
                    alt=""
                    style={{ width: "50px",height:"50px",cursor:"pointer"}}
                  />
    </OverlayTrigger>
  );