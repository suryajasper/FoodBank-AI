#ifndef INFORMATION_H
#define INFORMATION_H

#include <QMainWindow>

namespace Ui {
class Information;
}

class Information : public QMainWindow
{
    Q_OBJECT

public:
    explicit Information(QWidget *parent = nullptr);
    ~Information();

public slots:
    void clickedSlot();
    void next();

private:
    Ui::Information *ui;
    int calculateCalories(bool gender, int height, int age, double weight);
};

#endif // INFORMATION_H
