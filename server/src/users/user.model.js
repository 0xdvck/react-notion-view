class User {
  constructor(props) {
    this.name = props.name ?? '';
    this.company = props.company ?? null;
    this.status = props.status ?? null;
    this.priority = props.priority ?? null;
    this.checkbox = props.checkbox ?? null;
    this.number = props.number ?? null;
  }
}

module.exports = { User };
