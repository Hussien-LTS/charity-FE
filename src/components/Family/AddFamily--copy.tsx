/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
const schema: RJSFSchema = {
  type: "object",
  title: "Number fields & widgets",
  properties: {
    number: {
      title: "Number",
      type: "number",
    },
    integer: {
      title: "Integer",
      type: "integer",
    },
    numberEnum: {
      type: "number",
      title: "Number enum",
      enum: [1, 2, 3],
    },
    numberEnumRadio: {
      type: "number",
      title: "Number enum",
      enum: [1, 2, 3],
    },
    integerRange: {
      title: "Integer range",
      type: "integer",
      minimum: -50,
      maximum: 50,
    },
    integerRangeSteps: {
      title: "Integer range (by 10)",
      type: "integer",
      minimum: 50,
      maximum: 100,
      multipleOf: 10,
    },
  },
};

const uiSchema: UiSchema = {
  integer: {
    "ui:widget": "updown",
  },
  numberEnumRadio: {
    "ui:widget": "radio",
    "ui:options": {
      inline: true,
    },
  },
  integerRange: {
    "ui:widget": "range",
  },
  integerRangeSteps: {
    "ui:widget": "range",
  },
};

export default function JsonFormBuilder() {
  const [formData, setFormData] = useState(null);
  // useEffect(() => {
  //   console.log(formData, "formData");
  //   props.setJson(formData);
  // }, [formData, props]);

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      validator={validator}
    />
  );
}
