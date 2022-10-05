import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import "./../Assets/css/timeLine.css";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Timeline2() {
  useEffect(() => {
    Aos.init({
      offset: 300,
      duration: 2500,
    });
  }, []);

  return (
    <>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <p className="time-font">Login</p>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <p className="time-font">
            Drag n Drop or upload a PDF
            </p>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <p className="Time-Details time-font">
              {" "}
              View certificate on Ethereum & IPFS
            </p>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
          </TimelineSeparator>
          <TimelineContent>
            <p className="Time-Details time-font">
              {" "}
              Access to issuers authenticity{" "}
            </p>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}
