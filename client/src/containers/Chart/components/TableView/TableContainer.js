import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import TableComponent from "./TableComponent";

function TableContainer(props) {
  const { tabularData, height, embedded } = props;

  const [activeDataset, setActiveDataset] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (tabularData && !activeDataset) {
      setActiveDataset(Object.keys(tabularData)[0]);
    } else if (!tabularData[activeDataset]) {
      setActiveDataset(Object.keys(tabularData)[0]);
    }
  }, [tabularData]);

  const _onExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Menu secondary>
        {Object.keys(tabularData).map((dataset) => {
          return (
            <Menu.Item
              name={dataset}
              onClick={() => setActiveDataset(dataset)}
              active={activeDataset === dataset}
            />
          );
        })}
        {!embedded && (
          <Menu.Item
            name={expanded ? "See less" : "See more"}
            icon={expanded ? "arrow up" : "arrow down"}
            onClick={() => _onExpand()}
            style={styles.seeMore}
          />
        )}
      </Menu>
      {activeDataset && tabularData[activeDataset] && tabularData[activeDataset].columns && (
        <TableComponent
          height={expanded ? height + 200 : height}
          columns={tabularData[activeDataset].columns}
          data={tabularData[activeDataset].data}
          embedded={embedded}
        />
      )}
    </div>
  );
}

const styles = {
  seeMore: {
    border: "solid 1px #e8e8e8",
  },
};

TableContainer.defaultProps = {
  height: 300,
  embedded: false,
};

TableContainer.propTypes = {
  tabularData: PropTypes.object.isRequired,
  height: PropTypes.number,
  embedded: PropTypes.bool,
};

export default TableContainer;
